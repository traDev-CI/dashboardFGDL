import { BASE_PATH, API_VERSION } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

const getAccesToken = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!accessToken || accessToken === "null") {
    return null;
  }
  return willExpireToken(accessToken) ? null : accessToken;
};

const getRefreshToken = () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (!refreshToken || refreshToken === "null" || refreshToken === undefined) {
    return null;
  }
  return willExpireToken(refreshToken) ? null : refreshToken;
};

const refreshAccessToken = async (refreshToken) => {
  const url = `${BASE_PATH}/${API_VERSION}/refresh-acces-token`;
  console.log("====================================");
  console.log(refreshToken);
  console.log("====================================");
  const bodyObj = {
    refreshToken: refreshToken
  };
  const params = {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-type": "application/json"
    }
  };

  fetch(url, params)
    .then((response) => {
      if (response.status !== 200) {
        return null;
      }
      return response.json();
    })
    .then((result) => {
      if (!result) {
        logout();
      } else {
        const { accessToken, refreshToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
      }
    });
};

const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

const willExpireToken = (token) => {
  const seconds = 60;
  const metaToekn = jwtDecode(token);
  const { exp } = metaToekn;
  const now = (Date.now() + seconds) / 1000;
  return now > exp;
};

export { getAccesToken, getRefreshToken, logout, refreshAccessToken };
