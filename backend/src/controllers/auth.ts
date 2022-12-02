import { Request, Response } from "express";
import * as jwt from "../api/utils/jwt.utils";
import { redisClient } from "../redis/index";

const login = async (req: Request, res: Response) => {
  // TODO: handle DB authentication

  const userId = "1";

  const accessToken = jwt.generateToken();
  const refreshToken = jwt.generateToken();

  try {
    await redisClient.setEx(refreshToken, 24 * 60 * 60, userId);
  } catch (error) {
    res.status(500).send("Something went wrong, please try again later");
  }

  res.send({
    user: {
      email: "1234",
      name: "1234",
      accessToken,
      refreshToken,
    },
  });
};

const refresh = async (req: Request, res: Response) => {
  const { refreshToken, userId } = req.body;

  // if (!refreshToken || userId) {
  //   return res.status(401).send("Not Authorized");
  // }

  try {
    const redisRefreshToken = await redisClient.get(refreshToken);
    if (redisRefreshToken === undefined) {
      res.status(400).send("Token does not exist");
    }
    res.send(redisRefreshToken);
  } catch (error) {
    res.status(500).send("Failed to get token");
  }
};

export { login, refresh };
