import type { AxiosRequestConfig } from "axios";
import axios, { AxiosError } from "axios";

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
};

export const client = axios.create(config);

client.interceptors.request.use((config) => {
  const { accessToken } = JSON.parse(localStorage.getItem("token") || "{}");
  if (!config.headers) return config;

  if (accessToken !== null) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { refreshToken } = JSON.parse(localStorage.getItem("token") || "{}");
    const { config, response } = error;
    const status = response.status;
    const originalConfig = config;

    if (status === 400) {
      try {
        const res = await axios({
          method: "POST",
          url: `${config.baseURL}/auth/reissue`,
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        if (res.status === 200) {
          localStorage.setItem("token", JSON.stringify(res.data.data));
          originalConfig.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
          return axios(originalConfig);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          return Promise.reject(error.response?.data);
        }
      }
    }

    return Promise.reject(error);
  },
);
