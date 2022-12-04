import jwtDecode from "jwt-decode";

const isAuthenticated = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (accessToken === null || refreshToken === null) {
    return true;
  }

  const currentDate = Date.now();

  const decodedToken = jwtDecode<{
    exp: number;
  }>(accessToken);

  const hasExpired = currentDate >= decodedToken.exp * 1000;

  return hasExpired;
};

export { isAuthenticated };
