import axios from "axios";

// Axios instance for all API calls
export const api = axios.create({
  baseURL: "https://localhost:7240/api", // replace with your backend URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in headers
// add flows
