import { createBaseStore } from "@/shared/store/base.store";
import Cookies from "js-cookie";

// 📌 Interfaz específica del estado de autenticación
export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}

// 📌 Creación del store para autenticación
export const useAuthStore = createBaseStore<AuthState>((set) => ({
  token: Cookies.get("auth_token") || null,
  isAuthenticated: !!Cookies.get("auth_token"),

  setToken: (token: string) => {
    Cookies.set("auth_token", token, { expires: 7 });
    set((state) => ({ ...state, token, isAuthenticated: !!token }));
  },

  logout: () => {
    Cookies.remove("auth_token");
    set((state) => ({ ...state, token: null, isAuthenticated: false }));
  },
}));
