import axios from "axios";
import { Agent } from "https";

export const mncfClient = axios.create({
  baseURL: "https://digi.mncfinance.com/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  httpsAgent: new Agent({
    rejectUnauthorized: false,
  }),
});

mncfClient.interceptors.response.use(
  (response) => response,
  (error) => error.response,
);

//optional
// mncfClient.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${process.env.MNCF_TOKEN}`;
//   return config;
// });
