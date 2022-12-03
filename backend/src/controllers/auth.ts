import { Request, Response } from "express";
import * as jwt from "../api/utils/jwt.utils";
import { redisClient } from "../redis/index";

const login = async (req: Request, res: Response) => {
  // TODO: get user from DB
  // verify user email exists, verify user pass exists

  const userId = "1";

  const accessToken = jwt.generateToken();
  const refreshToken = jwt.generateToken("refresh");

  try {
    await redisClient.set(refreshToken, userId);
  } catch (error) {
    res.status(500).send("Something went wrong, please try again later");
  }
  console.log({ accessToken });

  res.send({
    user: {
      email: "1234",
      name: "1234",
    },
    token: {
      access: accessToken,
      refresh: refreshToken,
    },
  });
};

const refresh = async (req: Request, res: Response) => {
  const { refreshToken, userId } = req.body;

  // TODO: check if refresh token is there and userId as well
  // TODO: check if token has `bearer` in front
  // if (!refreshToken || userId) {
  //   return res.status(401).send("Not Authorized");
  // }

  try {
    const redisRefreshToken = await redisClient.get(refreshToken);
    if (redisRefreshToken === undefined) {
      res.status(400).send("Token does not exist");
    }

    redisClient.del(refreshToken);
    const newAccessToken = jwt.generateToken("access");
    const newRefreshToken = jwt.generateToken("refresh");
    redisClient.set(newRefreshToken, userId);

    res.send({
      token: {
        access: newAccessToken,
        refresh: newRefreshToken,
      },
    });
  } catch (error) {
    res.status(500).send("Failed to get token");
  }
};

export { login, refresh };
