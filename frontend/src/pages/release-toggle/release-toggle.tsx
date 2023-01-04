import {
  ActionIcon,
  Alert,
  Button,
  Flex,
  Menu,
  Paper,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconAlertCircle,
  IconCalendarEvent,
  IconCaretDown,
  IconCircleCheck,
  IconSettings,
  IconTrash,
  IconX,
} from "@tabler/icons";
import { AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CenteredLoader from "../../components/centered-loader/centered-loader";
import { useFetch } from "../../hooks/use-fetch/use-fetch";
import { useGlobalState } from "../../hooks/use-global-state/use-global-state";
import jwtAxios from "../../util/axios/axiosInstance";
import * as ApiTypes from "../types/apitypes";
import AddSegmentToReleaseToggleModal, {
  OnSubmitParams,
} from "../release-toggles/components/add-segment-to-release-toggle-modal/add-segment-to-release-toggle-modal";
import ScheduleReleaseModal from "../release-toggles/components/schedule-release-modal/schedule-release-modal";

const RELEASE_TOGGLE_URL = "/v1/release-toggles";

type ReleaseToggleProps = {
  releaseToggle: ApiTypes.ReleaseToggle;
  segments: ApiTypes.Segment[];
  refetchReleaseToggle: () => Promise<AxiosResponse>;
};

const ReleaseToggle = ({
  releaseToggle,
  segments,
  refetchReleaseToggle,
}: ReleaseToggleProps) => {
  const [state] = useGlobalState();

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
    url: `v1/schedule/schedule`,
    lazy: true,
    method: "post",
  });

  const { fetchData: cancelScheduledRelease } = useFetch({
    url: `v1/schedule/delete`,
    lazy: true,
    method: "patch",
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
            userName: `${state.user?.firstName} ${state.user?.lastName}`,
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

  const handleCancelScheduledRelease =
    (releaseToggle: ApiTypes.ReleaseToggle) => async () => {
      if (releaseToggle.release?.scheduleRef === undefined) {
        return;
      }
      try {
        await cancelScheduledRelease({
          id: releaseToggle.id,
        });

        await refetchReleaseToggle();

        showNotification({
          title: "Canceled!",
          message: "The scheduled release has been canceled!",
          color: "dark",
          icon: <IconCircleCheck color="lightgreen" />,
          autoClose: 10000,
        });
      } catch (error) {
        showNotification({
          title: "Failed to cancel schedule",
          message: `${error}`,
          color: "gray",
          icon: <IconX color="red" />,
          autoClose: 10000,
        });
      }
    };

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

      {/*  Schedule Release modal*/}
      <ScheduleReleaseModal
        isVisible={isScheduleReleaseModalVisible}
        onClose={toggleScheduleReleaseModal}
        onSubmit={handleScheduleRelease(releaseToggle.id)}
      />

      <Flex justify="space-between" align="center">
        <Title>
          {ReleaseToggle.name} {releaseToggle.id}(ID)
        </Title>

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="default">
              <IconCaretDown size={16} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              onClick={toggleAddSegmentModal}
              icon={<IconSettings size={14} />}
            >
              Add segment
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              onClick={toggleScheduleReleaseModal}
              icon={<IconCalendarEvent size={14} />}
            >
              Schedule release
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>

      {releaseToggle.release?.scheduleRef &&
      releaseToggle.release.date &&
      releaseToggle.release.userName ? (
        <Flex maw={"45%"} mt="lg" mb="lg" direction="column">
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Scheduled for release!"
            color="red"
            radius="xs"
          >
            <Text>
              This release toggle is schedule to release on
              {` ${new Date(
                releaseToggle.release.date
              ).toLocaleDateString()} ${new Date(
                releaseToggle.release.date
              ).toLocaleTimeString()}`}{" "}
              by {releaseToggle.release.userName}
            </Text>
            <Button
              mt="md"
              variant="light"
              onClick={handleCancelScheduledRelease(releaseToggle)}
            >
              Cancel schedule
            </Button>
          </Alert>
        </Flex>
      ) : null}

      <div>
        <Title fz="md" mt="xl" mb="sm">
          Description
        </Title>
        <Paper p="md">
          <Text>{releaseToggle.description}</Text>
        </Paper>

        <Title fz="md" mt="xl" mb="sm">
          {hasSegments
            ? "Applied Segments"
            : "No segments has been applied to this release toggle"}
        </Title>
      </div>

      {releaseToggle.segments.length ? (
        <Table verticalSpacing="md" highlightOnHover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Id</th>
              <th>Number of sites</th>
              <th>Description</th>
              <th>Created at</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {releaseToggle.segments.map(segment => (
              <tr key={segment.id}>
                <td>{segment.title}</td>
                <td>{segment.id}</td>
                <td>{segment.sites.length}</td>
                <td>{segment.description}</td>
                <td>{new Date(segment.createdAt).toDateString()}</td>
                <td>
                  <Button
                    variant="outline"
                    color="red"
                    onClick={handleDelete(segment.id)}
                  >
                    <IconTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
      releaseToggle={{ ...data }}
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
