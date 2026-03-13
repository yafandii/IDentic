import axios from "axios";

export const dukcapilClient = axios.create({
  baseURL: process.env.DUKCAPIL_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

dukcapilClient.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  },
);
