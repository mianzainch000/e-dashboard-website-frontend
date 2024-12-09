import axios from "axios";
import Cookies from "js-cookie";
import config from "./config.js";

const api = axios.create({
  baseURL: config.baseURL,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
