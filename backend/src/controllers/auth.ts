import { Request, Response } from "express";
import bcrypt from "bcrypt";

import * as jwt from "../api/utils/jwt.utils";
import { redisClient } from "../redis/index";
import { User } from "@prisma/client";
import { prisma } from "../prisma";

type ResponseUser = Omit<User, "password" | "createdAt" | "updatedAt">;

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user === null) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect === false) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const responseUser: ResponseUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const accessToken = jwt.generateToken("access", responseUser);
    const refreshToken = jwt.generateToken("refresh", responseUser);

    try {
      await redisClient.set(refreshToken, user.id);
      const sevenDaysInSeconds = 604800;
      await redisClient.EXPIRE(refreshToken, sevenDaysInSeconds);
    } catch (error) {
      return res.status(500).send({
        message:
          "Something went wrong while saving token, please try again later",
      });
    }

    return res.send({
      user: {
        ...responseUser,
      },
      token: {
        access: accessToken,
        refresh: refreshToken,
      },
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong, please try again later" });
  }
};

const refresh = async (req: Request, res: Response) => {
  const { refreshToken, userId } = req.body;

  if (!refreshToken || !userId) {
    return res.status(401).send({ message: "Not Authorized" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (user === null) {
      return res.status(400).send({ message: "Invalid user" });
    }

    const redisRefreshTokenValue = await redisClient.get(refreshToken);

    console.log({ redisRefreshTokenValue });

    if (redisRefreshTokenValue === undefined) {
      return res.status(401).send({ message: "Token does not exist" });
    }

    if (Number(redisRefreshTokenValue) !== user.id) {
      return res.status(401).send({ message: "User Id missmatch" });
    }

    // Delete old refresh token
    redisClient.del(refreshToken);

    const responseUser: ResponseUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const newAccessToken = jwt.generateToken("access", responseUser);
    const newRefreshToken = jwt.generateToken("refresh", responseUser);
    await redisClient.set(newRefreshToken, user.id);
    const sevenDaysInSeconds = 604800;
    await redisClient.EXPIRE(newRefreshToken, sevenDaysInSeconds);

    return res.send({
      user: responseUser,
      token: {
        access: newAccessToken,
        refresh: newRefreshToken,
      },
    });
  } catch (error) {
    res.status(500).send({ message: "Failed to get token" });
  }
};

export { login, refresh };
