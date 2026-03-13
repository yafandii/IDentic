import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

import { store } from "../redux/store";
import { logout } from "@/presentation/redux/slices/authSlice";
import Cookies from "js-cookie";

apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token || Cookies.get("auth_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  },
);

export default apiClient;
