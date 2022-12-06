import { useFetch } from "../../hooks/use-fetch/use-fetch";

const realeseTogglesUrl = "/v1/release-toggles";

const ReleaseToggles = () => {
  const { data, error, isLoading } = useFetch({
    url: realeseTogglesUrl,
  });
  console.log({ data, error, isLoading });

  return <h1>Release toggle</h1>;
};

export default ReleaseToggles;
