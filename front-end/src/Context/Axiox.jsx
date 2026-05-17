// --legacy-peer-deps
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
        try {
          const decoded = jwtDecode(token);
          const email = decoded?.emails?.[0] || decoded?.email;
          if (email) config.headers["X-User-Email"] = email;
        } catch {
          // ignore decode errors
        }
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
