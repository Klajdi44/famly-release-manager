import { useFetch } from "../../hooks/use-fetch/use-fetch";

const realeseTogglesUrl = "http://localhost:5000/api/v1/release-toggles";
const ReleaseToggles = () => {
  const { data, error, isLoading } = useFetch({ url: realeseTogglesUrl });

  console.log(data);

  return <h1>Release toggle</h1>;
};

export default ReleaseToggles;
