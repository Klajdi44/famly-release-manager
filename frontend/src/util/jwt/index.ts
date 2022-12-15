import axios from "axios";
import { User } from "../../pages/login/types";

type Response = User;

const refresh = async (
  refreshToken: string | undefined,
  userId: number
): Promise<User | undefined> => {
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
    console.error("something went wring while refreshing token");
  }
};

const resetTokens = () => {
  localStorage.removeItem("user");
};

export { refresh, resetTokens };
