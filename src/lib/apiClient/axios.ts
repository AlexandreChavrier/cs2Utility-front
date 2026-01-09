import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Configuration de base
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    indexes: null,
  },
});

// 🔴 INTERCEPTEUR TEMPORAIREMENT DÉSACTIVÉ POUR DEBUG
// Intercepteur de réponse - VERSION SIMPLE
apiClient.interceptors.response.use(
  (response) => {
    console.log("✅ Success:", response.config.url, response.status);
    return response;
  },
  async (error: AxiosError) => {
    console.error(
      "❌ Error:",
      error.config?.url,
      error.response?.status,
      error.message
    );

    // 🔴 ON NE RETRY PAS - on rejette directement
    return Promise.reject(error);
  }
);

export default apiClient;
