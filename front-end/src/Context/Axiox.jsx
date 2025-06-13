// --legacy-peer-deps
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8089/API/V1/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("studyBuddy");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.error("Access forbidden: insufficient permissions or invalid token.");
    }
    return Promise.reject(error);
  }
);

export default API;
