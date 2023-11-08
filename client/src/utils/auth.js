import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});

const cookie = new Cookies();

function isAccessTokenExpired(token) {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  const expirationTime = decodedToken.exp * 1000;
  const currentTime = Date.now();
  return currentTime > expirationTime;
}

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      isAccessTokenExpired(cookie.get("accessToken")) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await api.get("/auth/refresh-token").catch((err) => {
          console.log(err);
        });
        const accessToken = response.data.message;
        cookie.set("accessToken", accessToken, { path: "/" });

        return api(originalRequest);
      } catch (error) {
        console.log(error);
        cookie.remove("accessToken", { path: "/" });
        cookie.remove("refreshToken", { path: "/" });
        cookie.remove("CookieRefreshToken");
        cookie.remove("CookieAccesssToken");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
