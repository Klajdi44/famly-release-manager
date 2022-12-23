import { Text } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import CenteredLoader from "../../../components/centered-loader/centered-loader";
import { useFetch } from "../../../hooks/use-fetch/use-fetch";
import * as ApiTypes from "../../types/apitypes";

const TOGGLE_ID = "toggle-id";
const RELEASE_TOGGLE_URL = "/v1/release-toggles";

type ReleaseToggleProps = {
  releaseToggle: ApiTypes.ReleaseToggle;
  segments: ApiTypes.Segment[];
};

const ReleaseToggle = ({ releaseToggle, segments }: ReleaseToggleProps) => {
  return (
    <div>
      <Text>Id: {releaseToggle.id}</Text>
      <Text>Name: {releaseToggle.name}</Text>
      <Text>Description: {releaseToggle.description}</Text>
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
