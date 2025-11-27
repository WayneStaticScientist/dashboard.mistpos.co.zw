import useSessionState from "@/stores/session-store";
import { TUser } from "@/types/user-t";
import axios from "axios";

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}`,
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    const deviceId = getUserDeviceId();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (deviceId) {
      config.headers["device"] = deviceId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await getNewTokensForTransport();
        originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const getNewTokensForTransport = async (): Promise<TUser> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}` + `/user/tokens`,
      {},
      {
        headers: {
          device: getUserDeviceId(),
          Authorization: `Bearer ${getRefreshToken()}`,
        },
      }
    );
    const body = response.data;
    localStorage.setItem("accessToken", body.tokens.accessToken);
    localStorage.setItem("refreshToken", body.tokens.refreshToken);
    useSessionState.setState(body.user);
    localStorage.setItem("user", JSON.stringify(body.user));
    return body.user;
  } catch (error) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    useSessionState.setState({});
    throw error;
  }
};
export default apiClient;
function getAccessToken() {
  return localStorage.getItem("accessToken");
}
export function getUserDeviceId() {
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = generateDeviceId();
    localStorage.setItem("deviceId", deviceId);
  }
  return localStorage.getItem("deviceId");
}
function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}
function generateDeviceId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
