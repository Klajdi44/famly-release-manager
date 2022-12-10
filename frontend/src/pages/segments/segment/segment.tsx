import { Text } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

const SEGMENT_ID_PARAM = "id";

const Segment = () => <div>Hello world</div>;

type SegmentLoaderProps = {
  segmentId: string;
};

const SegmentLoader = ({ segmentId }: SegmentLoaderProps) => {
  return <div>{segmentId}</div>;
};

const WithUrlParams = () => {
  const [params] = useSearchParams();
  const toggleId = params.get(SEGMENT_ID_PARAM);

  if (toggleId === null) {
    return <Text>Error: toggle Id missing from URL</Text>;
  }

  return <SegmentLoader segmentId={toggleId} />;
};

export default WithUrlParams;
