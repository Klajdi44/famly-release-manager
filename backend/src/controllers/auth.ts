import { Request, Response } from "express";
import * as jwt from "../api/utils/jwt.utils";
import { redisClient } from "../redis/index";

const login = async (req: Request, res: Response) => {
  // TODO: handle DB authentication

  const userId = Math.random().toString();

  const accessToken = jwt.generateToken();
  const refreshToken = jwt.generateToken();

  try {
    await redisClient.set(userId, refreshToken);
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

export { login };
