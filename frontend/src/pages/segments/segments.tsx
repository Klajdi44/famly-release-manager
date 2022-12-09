import { Text } from "@mantine/core";
import CenteredLoader from "../../components/centered-loader/centered-loader";
import { useFetch } from "../../hooks/use-fetch/use-fetch";
import * as ApiTypes from "../types/apitypes";

const SEGMENTS_URL = "v1/segments";

type SegmentsProps = {
  segments: ApiTypes.Segments[];
};

const Segments = (segments: SegmentsProps) => {
  console.log(segments);

  return <div>asd</div>;
};

const Loader = () => {
  const { data, error, isLoading } = useFetch<ApiTypes.Segments[]>({
    url: SEGMENTS_URL,
  });

  if (isLoading) {
    return <CenteredLoader />;
  }

  if ((error && error !== "canceled") || data === null) {
    return <Text>Something went wrong... please try again</Text>;
  }

  if (isLoading === false && data === null) {
    return <Text>Could not fetch segments</Text>;
  }

  return <Segments segments={data} />;
};

export default Loader;
