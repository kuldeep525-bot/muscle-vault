import axios from "axios";

// =============================================
// BASE URL — Backend ka address
// Jab bhi API call karenge yeh URL use hoga
// =============================================
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// =============================================
// INTERCEPTOR — Har request se pehle chalta hai
// Token localStorage mein hai toh
// automatically har request ke saath bhejta hai
// Jaise — har chitthi ke saath ID card lagana
// =============================================
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =============================================
// INTERCEPTOR — Har response ke baad chalta hai
// Agar 401 aaya (token expire) toh
// localStorage clear karo aur login pe bhejo
// =============================================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default API;
