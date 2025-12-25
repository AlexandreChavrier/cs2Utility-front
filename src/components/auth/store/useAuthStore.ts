import apiClient from "@/lib/apiClient/axios";
import { UserResponse } from "@/lib/cs2utilityApi/apiResponses";
import { ApiRoutes } from "@/lib/cs2utilityApi/apiRoutes";
import { createAppStore } from "@/lib/store/createAppStore";

export type User = UserResponse;

type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasError: boolean;
};

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  hasError: false,
};

type AuthActions = {
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  register: ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  logout: () => Promise<{ userFullName: string; message: string } | undefined>;
  checkAuth: () => Promise<void>;
};

export type AuthStore = AuthState & AuthActions;

const useAuthStore = createAppStore<AuthStore>("auth", (set) => ({
  ...initialState,
  async login({ email, password }) {
    try {
      set({
        isLoading: true,
        hasError: false,
        isAuthenticated: false,
        user: null,
      });

      const response = await apiClient.post<UserResponse>(ApiRoutes.LOGIN, {
        email,
        password,
      });

      const userLogedIn = response.data;
      console.log(userLogedIn);

      set({
        user: userLogedIn,
        isLoading: false,
        hasError: false,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error(error);
      set({
        hasError: true,
        isLoading: false,
        isAuthenticated: false,
        user: null,
      });
    }
  },
  async register({ confirmPassword, email, firstName, lastName, password }) {
    try {
      set({
        isLoading: true,
        isAuthenticated: false,
        hasError: false,
        user: null,
      });

      const response = await apiClient.post<UserResponse>(ApiRoutes.REGISTER, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      const userRegistered = response.data;

      set({
        isLoading: false,
        user: userRegistered,
        isAuthenticated: true,
        hasError: false,
      });
    } catch (error) {
      console.error(error);
      set({
        hasError: true,
        isLoading: false,
        isAuthenticated: false,
        user: null,
      });
    }
  },
  async logout() {
    try {
      set({
        isLoading: true,
        hasError: false,
      });

      const response = await apiClient.post<{
        userFullName: string;
        message: string;
      }>(ApiRoutes.LOGOUT);

      const userLogedOut = response.data;

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        hasError: false,
      });

      return userLogedOut;
    } catch (error) {
      console.error(error);
      set({
        hasError: true,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
    }
  },
  async checkAuth() {
    try {
      set({ isLoading: true, hasError: false });

      const response = await apiClient.get<UserResponse>(ApiRoutes.PROFILE);

      const currentUser = response.data;

      set({
        user: currentUser,
        isAuthenticated: true,
        isLoading: false,
        hasError: false,
      });
    } catch (error) {
      console.log(error);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        hasError: false,
      });
    }
  },
}));

export default useAuthStore;
