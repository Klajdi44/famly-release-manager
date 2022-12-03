import axios from "axios";
import jwtDecode from "jwt-decode";
import { refresh } from "../jwt/refresh";

// TODO: put this in a .env
const baseURL = "http://localhost:5000/api/";

// TODO: add token names in constants
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

const jwtAxios = axios.create({
  baseURL,
  headers: {
    authorization: `Bearer ${accessToken}`,
  },
});

jwtAxios.interceptors.request.use(async req => {
  // remove TS possibly undefined error
  req.headers = req.headers ?? {};

  if (accessToken !== null) {
    req.headers.authorization = `Bearer ${accessToken}`;

    const decodedToken = jwtDecode<{
      exp: number;
    }>(accessToken);

    const hasExpired = Date.now() >= decodedToken.exp * 1000;
    console.log({ hasExpired });

    if (hasExpired && refreshToken !== null) {
      const token = await refresh(refreshToken);
      if (token !== undefined) {
        req.headers["authorization"] = `Bearer ${token.access}`;
        localStorage.setItem("refreshToken", token.access);
        localStorage.setItem("accessToken", token.refresh);
      }
    }
  }

  return req;
});

export default jwtAxios;
