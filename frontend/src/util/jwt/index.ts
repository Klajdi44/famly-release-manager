import { showNotification } from "@mantine/notifications";
import axios, { AxiosError } from "axios";
import { UserWithTokens } from "../../pages/login/types";

type Response = UserWithTokens;

const refresh = async (
  refreshToken: string | undefined,
  userId: number
): Promise<Response | undefined> => {
  if (refreshToken === undefined || userId === undefined) {
    return;
    // TODO: throw an error
  }

  try {
    const response = await axios.post<Response>(
      //TODO: add .env here for domain name
      "http://localhost:5000/api/v1/auth/refresh",
      {
        refreshToken,
        userId,
      }
    );

    if (response.status === 200) {
      // TODO: is checking res necessary with axios?
      return response.data;
    }

    return undefined;
  } catch (error) {
    if (error instanceof AxiosError) {
      showNotification({
        title: "Something went wrong!",
        message: error.response?.data.message,
        color: "red",
        icon: "x",
      });
    }
  }
};

const resetTokens = () => {
  localStorage.removeItem("userTokens");
};

export { refresh, resetTokens };
