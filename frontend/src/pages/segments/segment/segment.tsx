import { Text } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import CenteredLoader from "../../../components/centered-loader/centered-loader";
import { useFetch } from "../../../hooks/use-fetch/use-fetch";
import * as ApiTypes from "../../types/apitypes";

const SEGMENT_ID_PARAM = "id";
const SEGMENT_URL = "v1/segments";

type SegmentProps = {
  segment: ApiTypes.Segment;
};

const Segment = ({ segment }: SegmentProps) => {
  return (
    <div>
      <Text>Id: {segment.id}</Text>
      <Text>Name: {segment.title}</Text>
      <Text>Description: {segment.description}</Text>
    </div>
  );
};

type SegmentLoaderProps = {
  segmentId: string;
};

const SegmentLoader = ({ segmentId }: SegmentLoaderProps) => {
  const { data, error, isLoading } = useFetch<ApiTypes.Segment>({
    url: `${SEGMENT_URL}/${segmentId}`,
  });

  if (isLoading) {
    return <CenteredLoader />;
  }

  if (error && error !== "canceled") {
    return <Text>Something went wrong while getting the segment</Text>;
  }

  if (data === null) {
    return <Text>No segment with id: {segmentId} was found!</Text>;
  }

  return <Segment segment={data} />;
};

const WithUrlParams = () => {
  const [params] = useSearchParams();
  const segmentId = params.get(SEGMENT_ID_PARAM);

  if (segmentId === null) {
    return <Text>Error: toggle Id missing from URL</Text>;
  }

  return <SegmentLoader segmentId={segmentId} />;
};

export default WithUrlParams;
