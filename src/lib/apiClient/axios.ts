import axios from 'axios';
import { ApiRoutes } from '../cs2utilityApi/apiRoutes';

// Configuration de base
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // permet l'envoi des cookies httpOnly
  headers: {
    'Content-Type': 'application/json',
  },
});

// Variable pour éviter les appels multiples de refresh
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Intercepteur de réponse pour gérer les erreurs et le refresh automatique
apiClient.interceptors.response.use(
  (response) => {
    // Si la réponse est OK, on la retourne telle quelle
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si l'erreur est 401 (non autorisé) et qu'on n'a pas encore essayé de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Si un refresh est déjà en cours, on met la requête en file d'attente
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Appel au endpoint refresh pour obtenir de nouveaux tokens
        await apiClient.post(ApiRoutes.REFRESH);

        processQueue(null, null);

        // Relancer la requête originale
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        // Si le refresh échoue, rediriger vers la page de login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;