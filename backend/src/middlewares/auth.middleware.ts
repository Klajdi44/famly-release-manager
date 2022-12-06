import { Request, Response, NextFunction } from "express";
import { validateToken } from "../api/utils/jwt.utils";

/**
 * middleware to check whether user has access to a specific endpoint
 *
 */
export const authorize =
  () => async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.path);

    if (req.path === "/api/v1/auth/login/") {
      return next();
    }

    try {
      const jwt = req.headers.authorization;

      // verify request has token
      if (!jwt) {
        return res.status(401).json({ message: "Tokken is missing" });
      }

      // remove Bearer if using Bearer Authorization mechanism
      const possibleJwtWithoutBearer = jwt.toLowerCase().startsWith("bearer")
        ? jwt.slice("bearer".length).trim()
        : jwt;

      // verify token
      await validateToken(possibleJwtWithoutBearer);

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({ message: "Expired token" });
        return;
      }

      if (error.name === "JsonWebTokenError") {
        // token provided is invalid
        res.status(401).json({ message: "Token is invalid" });
        return;
      }

      res.status(500).json({ message: "Failed to authenticate user" });
    }
  };
