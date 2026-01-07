import axios from "axios";

// Normalize URL to ensure it has a protocol
const getBaseURL = () => {
  const url = import.meta.env.VITE_API_URL || "http://localhost:4000";
  // If URL doesn't start with http:// or https://, add http://
  if (url && !url.match(/^https?:\/\//i)) {
    return `http://${url}`;
  }
  return url;
};

// Create the API instance without store dependencies
const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// We'll set up a function to inject the store later
let storeInjected = false;
let storeRef = null;

export const injectStore = (store) => {
  if (storeInjected) return;
  storeRef = store;
  storeInjected = true;
};

api.interceptors.request.use(
  (config) => {
    if (storeRef) {
      const state = storeRef.getState();
      const { user } = state.auth;

      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } else {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common response issues
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - user may need to login again");
    }

    console.error("API Error:", error);

    return Promise.reject(error);
  }
);

export default api;
