import { sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";

import { config } from "../../config";

/**
 * generates JWT used for local testing
 */
type TokenType = "access" | "refresh";
type Payload = {
  email: string;
  id: number;
};
const generateToken = (
  type: TokenType = "access",
  payload: Payload = {
    email: "Andrei Mihutoni",
    id: 123,
  }
) => {
  // read private key value
  const privateKey = {
    key: fs.readFileSync(path.join(__dirname, "../../../private.pem")),
    passphrase: "",
  };

  const signInOptions: SignOptions = {
    // RS256 uses a public/private key pair. The API provides the private key
    // to generate the JWT. The client gets a public key to validate the
    // signature
    algorithm: "RS256",
    expiresIn: type === "access" ? "1d" : "7d",
    // expiresIn: type === "access" ? (config.isProduction ? "24h" : "15m") : 0,
  };

  // generate JWT
  return sign(payload, privateKey, signInOptions);
};

type TokenPayload = {
  exp: number;
  accessTypes: string[];
  email: string;
  userId: number;
};

/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
const validateToken = (token: string): Promise<TokenPayload> => {
  const publicKey = fs.readFileSync(
    path.join(__dirname, "../../../public.pem")
  );

  const verifyOptions: VerifyOptions = {
    algorithms: ["RS256"],
  };

  return new Promise((resolve, reject) => {
    verify(token, publicKey, verifyOptions, (error, decoded: TokenPayload) => {
      if (error) return reject(error);

      resolve(decoded);
    });
  });
};

export { generateToken, validateToken };
