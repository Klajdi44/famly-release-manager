import { Text } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import CenteredLoader from "../../../components/centered-loader/centered-loader";
import { useFetch } from "../../../hooks/use-fetch/use-fetch";
import * as ReleaseToggleApiTypes from "../../types/release-toggle/apitypes";

const TOGGLE_ID = "toggle-id";
const RELEASE_TOGGLE_URL = "/v1/release-toggles";

type ReleaseToggleProps = {
  releaseToggle: ReleaseToggleApiTypes.ReleaseToggle;
};

const ReleaseToggle = ({ releaseToggle }: ReleaseToggleProps) => {
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

const ReleaseToggleLoader = ({ toggleId }: ReleaseToggleLoaderProps) => {
  const { data, error, isLoading } =
    useFetch<ReleaseToggleApiTypes.ReleaseToggle>({
      url: `${RELEASE_TOGGLE_URL}/${toggleId}`,
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

  return <ReleaseToggle releaseToggle={data} />;
};

const CheckParamsForToggleId = () => {
  const [params] = useSearchParams();
  const toggleId = params.get(TOGGLE_ID);

  if (toggleId === null) {
    return <Text>Error: toggle Id missing from URL</Text>;
  }

  return <ReleaseToggleLoader toggleId={toggleId} />;
};

export default CheckParamsForToggleId;
