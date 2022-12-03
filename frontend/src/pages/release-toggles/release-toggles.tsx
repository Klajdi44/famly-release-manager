import { useEffect } from "react";
import jwtAxios from "../../util/axios/axiosInstance";

const realeseTogglesUrl = "v1/release-toggles";

const ReleaseToggles = () => {
  useEffect(() => {
    (async () => {
      const result = await jwtAxios.get(realeseTogglesUrl);
      console.log(result.data);
    })();
  }, []);

  return <h1>Release toggle</h1>;
};

export default ReleaseToggles;
