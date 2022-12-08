import { Text } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import CenteredLoader from "../../../components/centered-loader/centered-loader";
import { useFetch } from "../../../hooks/use-fetch/use-fetch";
import { ReleaseToggle } from "../../types/release-toggle/apitypes";

const TOGGLE_ID = "toggle-id";
const SINGLE_TOGGLE_URL = "/v1/release-toggles";

type SingleReleaseToggleProps = {
  releaseToggle: ReleaseToggle;
};

const SingleReleaseToggle = ({ releaseToggle }: SingleReleaseToggleProps) => {
  return (
    <div>
      <Text>Id: {releaseToggle.id}</Text>
      <Text>Name: {releaseToggle.name}</Text>
      <Text>Description: {releaseToggle.description}</Text>
    </div>
  );
};

type DataLoaderProps = {
  toggleId: string;
};

const DataLoader = ({ toggleId }: DataLoaderProps) => {
  const { data, error, isLoading } = useFetch<ReleaseToggle>({
    url: `${SINGLE_TOGGLE_URL}/${toggleId}`,
  });

  if (isLoading) {
    return <CenteredLoader />;
  }

  if (error && error !== "canceled") {
    return <Text>Something went wrong while getting the release toggle</Text>;
  }

  if (data === null) {
    return <Text>No release toggle with id: {toggleId} was found!</Text>;
  }

  return <SingleReleaseToggle releaseToggle={data} />;
};

const CheckParamsForToggleId = () => {
  const [params] = useSearchParams();
  const toggleId = params.get(TOGGLE_ID);

  if (toggleId === null) {
    return <Text>Error: toggle Id missing from URL</Text>;
  }

  return <DataLoader toggleId={toggleId} />;
};

export default CheckParamsForToggleId;
