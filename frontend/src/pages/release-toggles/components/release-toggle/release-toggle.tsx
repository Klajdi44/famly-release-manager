import { Button, Container, Flex, Paper, Text, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCircleCheck, IconTrash, IconX } from "@tabler/icons";
import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CenteredLoader from "../../../../components/centered-loader/centered-loader";
import { useFetch } from "../../../../hooks/use-fetch/use-fetch";
import jwtAxios from "../../../../util/axios/axiosInstance";
import * as ApiTypes from "../../../types/apitypes";
import AddSegmentToReleaseToggleModal, {
  OnSubmitParams,
} from "../add-segment-to-release-toggle-modal/add-segment-to-release-toggle-modal";
import ScheduleReleaseModal from "../schedule-release-modal/schedule-release-modal";

const RELEASE_TOGGLE_URL = "/v1/release-toggles";

type ReleaseToggleProps = {
  releaseToggle: ApiTypes.ReleaseToggle;
  segments: ApiTypes.Segment[];
  refetchReleaseToggle: () => Promise<void>;
};

const ReleaseToggle = ({
  releaseToggle,
  segments,
  refetchReleaseToggle,
}: ReleaseToggleProps) => {
  const [isAddSegmentModalVisible, setIsAddSegmentModalVisible] =
    useState(false);

  const [isScheduleReleaseModalVisible, setIsScheduleReleaseModalVisible] =
    useState(false);

  const hasSegments = releaseToggle.segments.length > 0;

  const { fetchData: addSegmentToReleaseToggle } = useFetch({
    url: `v1/release-toggles/add-segment-to-release-toggle/${releaseToggle.id}`,
    lazy: true,
    method: "post",
  });

  const { fetchData: scheduleRelease } = useFetch({
    url: `v1/prisma/schedule`,
    lazy: true,
    method: "post",
  });

  const toggleAddSegmentModal = () => {
    setIsAddSegmentModalVisible(prevState => !prevState);
  };

  const toggleScheduleReleaseModal = () => {
    setIsScheduleReleaseModalVisible(prevState => !prevState);
  };

  const handleAddSegmentToReleaseToggle = useCallback(
    async (segmentIds: OnSubmitParams) => {
      await addSegmentToReleaseToggle({
        segments: segmentIds,
      });

      toggleAddSegmentModal();
      await refetchReleaseToggle();
    },
    []
  );

  const handleScheduleRelease = useCallback(
    (releaseToggleId: number) =>
      async ({ date }: { date: Date }) => {
        try {
          await scheduleRelease({
            id: releaseToggleId,
            date,
          });

          showNotification({
            title: "Release scheduled!",
            message: `This release toggle will be released on ${date}`,
            color: "dark",
            icon: <IconCircleCheck color="lightgreen" />,
            autoClose: 10000,
          });
        } catch (error) {
          showNotification({
            title: "Failed to schedule release",
            message: `${error}`,
            color: "gray",
            icon: <IconX color="red" />,
            autoClose: 10000,
          });
        }

        toggleScheduleReleaseModal();
        await refetchReleaseToggle();
      },
    []
  );

  const handleDelete = (segmentId: ApiTypes.Segment["id"]) => async () => {
    await jwtAxios.delete(
      `v1/release-toggles/delete-segment-from-release-toggle/${releaseToggle.id}`,
      {
        data: {
          segment: { id: segmentId },
        },
      }
    );

    refetchReleaseToggle();
  };

  return (
    <div>
      {/* Modal to add segments to site */}
      <AddSegmentToReleaseToggleModal
        isVisible={isAddSegmentModalVisible}
        segments={segments}
        onClose={toggleAddSegmentModal}
        onSubmit={handleAddSegmentToReleaseToggle}
      />

      <Flex justify="space-between" align="center">
        <div>
          <Title>
            {ReleaseToggle.name} {releaseToggle.id}(ID)
          </Title>

          {/*  Schedule Release modal*/}
          <ScheduleReleaseModal
            isVisible={isScheduleReleaseModalVisible}
            onClose={toggleScheduleReleaseModal}
            onSubmit={handleScheduleRelease(releaseToggle.id)}
          />

          <Button onClick={toggleScheduleReleaseModal}>Schedule release</Button>

          <Paper>
            <Text>{releaseToggle.description}</Text>
          </Paper>

          <Text mt={hasSegments ? "lg" : "sm"}>
            {hasSegments
              ? "Applied Segments"
              : "No segments has been applied to this release toggle"}
          </Text>
        </div>
        <Button onClick={toggleAddSegmentModal}>Add segment</Button>
      </Flex>
      {releaseToggle.segments.length ? (
        <Paper>
          {releaseToggle.segments.map(segment => (
            <Container key={segment.id} p="md">
              <Flex justify="space-between" wrap="wrap">
                <Title fz="lg">{segment.title}</Title>
                <Title fz="lg">{segment.description}</Title>
                <Title fz="lg">
                  {new Date(segment.createdAt).toDateString()}
                </Title>
                <Button
                  variant="outline"
                  color="red"
                  onClick={handleDelete(segment.id)}
                >
                  <IconTrash />
                </Button>
              </Flex>
            </Container>
          ))}
        </Paper>
      ) : null}
    </div>
  );
};

type ReleaseToggleLoaderProps = {
  toggleId: string;
};

const WithReleaseToggleAndSegmentData = ({
  toggleId,
}: ReleaseToggleLoaderProps) => {
  const {
    data,
    error,
    isLoading,
    fetchData: refetchReleaseToggle,
  } = useFetch<ApiTypes.ReleaseToggle>({
    url: `${RELEASE_TOGGLE_URL}/${toggleId}`,
  });

  const {
    data: segments,
    error: segmentError,
    isLoading: isSegmentsLoading,
  } = useFetch<ApiTypes.Segment[]>({
    url: "/v1/segments/",
  });

  if (isLoading || isSegmentsLoading) {
    return <CenteredLoader />;
  }

  if (
    (error && error !== "canceled") ||
    (segmentError && segmentError !== "canceled")
  ) {
    return (
      <Text>
        Something went wrong while getting the release toggle or segment
      </Text>
    );
  }

  if (data === null) {
    return <Text>No release toggle with id: {toggleId} was found!</Text>;
  }

  return (
    <ReleaseToggle
      releaseToggle={data}
      segments={segments ?? []}
      refetchReleaseToggle={refetchReleaseToggle}
    />
  );
};

const WithUrlParams = () => {
  const [params] = useSearchParams();
  const toggleId = params.get("toggle-id");

  if (toggleId === null) {
    return <Text>Error: toggle Id missing from URL</Text>;
  }

  return <WithReleaseToggleAndSegmentData toggleId={toggleId} />;
};

export default WithUrlParams;
