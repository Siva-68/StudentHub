import axios from "axios";

// With the Vite proxy, all /api calls go to http://localhost:5000/api automatically
const API = axios.create({
  baseURL: "/api",          // relative – works with Vite proxy in dev & same-origin in prod
  timeout: 15000,
});

// ── Request Interceptor: attach JWT token ──────────────────────────────────
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("studenthub_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor: handle 401 (expired / missing token) ────────────
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !window.location.pathname.includes("/login") &&
      !window.location.pathname.includes("/register")
    ) {
      localStorage.removeItem("studenthub_token");
      localStorage.removeItem("studenthub_user");
      window.location.href = "/login?expired=true";
    }
    return Promise.reject(error);
  }
);

export default API;