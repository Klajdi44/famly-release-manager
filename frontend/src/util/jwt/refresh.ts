import axios from "axios";

type Response = {
  token: {
    access: string;
    refresh: string;
  };
};

const refresh = async (
  refreshToken: string | undefined
): Promise<{ access: string; refresh: string } | undefined> => {
  if (refreshToken === undefined) {
    return;
  }
  try {
    const response = await axios.post<Response>(
      //TODO: add .env here
      "http://localhost:5000/api/v1/auth/refresh",
      {
        refreshToken,
        userId: "1",
      }
    );

    if (response.status === 200) {
      // TODO: is checking res necessary with axios?
      return {
        access: response.data.token.access,
        refresh: response.data.token.refresh,
      };
    }

    return undefined;
  } catch (error) {
    console.error("something went wring while refreshing token");
  }
};

export { refresh };
