import { Request, Response } from "express";
import bcrypt from "bcrypt";

import * as jwt from "../api/utils/jwt.utils";
import { redisClient } from "../redis/index";
import { User } from "@prisma/client";
import { prisma } from "../prisma";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user === null) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect === false) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const userWithoutPassword: User = { ...user, password: null };

    const accessToken = jwt.generateToken("access", userWithoutPassword);
    const refreshToken = jwt.generateToken("refresh", userWithoutPassword);

    try {
      await redisClient.set(refreshToken, user.id);
    } catch (error) {
      res
        .status(500)
        .send(
          "Something went wrong while saving token, please try again later"
        );
    }
    console.log({ accessToken });

    return res.send({
      user: {
        ...userWithoutPassword,
        token: {
          access: accessToken,
          refresh: refreshToken,
        },
      },
    });
  } catch (error) {
    res.status(500).send("Something went wrong, please try again later");
  }
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
