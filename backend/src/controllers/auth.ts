import { Request, Response } from "express";
import bcrypt from "bcrypt";

import * as jwt from "../api/utils/jwt.utils";
import { redisClient } from "../redis/index";
const { User } = require("../sequelize/models");

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({
    where: { email },
    attributes: ["id", "firstName", "lastName", "email", "password"],
  });

  if (user === null) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (isPasswordCorrect === false) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const accessToken = jwt.generateToken();
  const refreshToken = jwt.generateToken("refresh");

  try {
    await redisClient.set(refreshToken, user.id);
  } catch (error) {
    res.status(500).send("Something went wrong, please try again later");
  }
  console.log({ accessToken });

  return res.send({
    user: {
      email: "1234",
      name: "1234",
      id: user.id,
      token: {
        access: accessToken,
        refresh: refreshToken,
      },
    },
  });
};

const refresh = async (req: Request, res: Response) => {
  const { refreshToken, userId } = req.body;

  // TODO: check if refresh token is there and userId as well
  // TODO: check if token has `bearer` in front
  // TODO: grab user from the DB
  // if (!refreshToken || userId) {
  //   return res.status(401).send("Not Authorized");
  // }

  try {
    const redisRefreshToken = await redisClient.get(refreshToken);
    if (redisRefreshToken === undefined) {
      res.status(401).send("Token does not exist");
    }
    // Delete old refresh token
    redisClient.del(refreshToken);

    const newAccessToken = jwt.generateToken("access");
    const newRefreshToken = jwt.generateToken("refresh");
    redisClient.set(newRefreshToken, userId);

    res.send({
      name: "test",
      surname: "test",
      email: "test",
      id: "1",
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
