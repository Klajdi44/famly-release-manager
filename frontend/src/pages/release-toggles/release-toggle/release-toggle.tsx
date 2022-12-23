import { Button, Flex, Text, Title } from "@mantine/core";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CenteredLoader from "../../../components/centered-loader/centered-loader";
import { useFetch } from "../../../hooks/use-fetch/use-fetch";
import * as ApiTypes from "../../types/apitypes";
import AddSegmentToReleaseToggleModal from "../add-segment-to-release-toggle-modal/add-segment-to-release-toggle-modal";

const TOGGLE_ID = "toggle-id";
const RELEASE_TOGGLE_URL = "/v1/release-toggles";

type ReleaseToggleProps = {
  releaseToggle: ApiTypes.ReleaseToggle;
  segments: ApiTypes.Segment[];
};

const ReleaseToggle = ({ releaseToggle, segments }: ReleaseToggleProps) => {
  const [isAddSegmentModalVisible, setIsAddSegmentModalVisible] =
    useState(false);

  const toggleAddSegmentModal = () => {
    setIsAddSegmentModalVisible(prevState => !prevState);
  };

  const handleAddSegmentToReleaseToggle = () => {};

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

          <Text>
            {releaseToggle.segments.length
              ? "Applied Segments"
              : "No segments has been applied to this release toggle"}
          </Text>
        </div>
        <Button onClick={toggleAddSegmentModal}>Add segment</Button>
      </Flex>
    </div>
  );
};

type ReleaseToggleLoaderProps = {
  toggleId: string;
};

const WithReleaseToggleAndSegmentData = ({
  toggleId,
}: ReleaseToggleLoaderProps) => {
  const { data, error, isLoading } = useFetch<ApiTypes.ReleaseToggle>({
    url: `${RELEASE_TOGGLE_URL}/${toggleId}`,
  });

  const {
    data: segments,
    error: segmentError,
    isLoading: isSegmentsLoading,
  } = useFetch<ApiTypes.Segment[]>({
    url: "/v1/segments/",
  });

  console.log({ segments });

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

  return <ReleaseToggle releaseToggle={data} segments={segments ?? []} />;
};

const WithUrlParams = () => {
  const [params] = useSearchParams();
  const toggleId = params.get(TOGGLE_ID);

  if (toggleId === null) {
    return <Text>Error: toggle Id missing from URL</Text>;
  }

  return <WithReleaseToggleAndSegmentData toggleId={toggleId} />;
};

export default WithUrlParams;
