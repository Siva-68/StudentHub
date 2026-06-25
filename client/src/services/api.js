import axios from "axios";

// Use VITE_API_URL in production (full backend URL), falls back to "/api" for Vite dev proxy
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
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