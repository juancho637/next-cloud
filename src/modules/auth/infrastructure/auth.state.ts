import { createBaseStore } from "@/shared/store/base.store";
import Cookies from "js-cookie";

// 📌 Interfaz específica del estado de autenticación
export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  initializing: boolean; // Nuevo estado
  setToken: (token: string) => void;
  logout: () => void;
  setInitializing: (init: boolean) => void;
}

export const useAuthStore = createBaseStore<AuthState>((set) => ({
  token: Cookies.get("auth_token") || null,
  isAuthenticated: !!Cookies.get("auth_token"),
  initializing: true, // inicia en true
  setToken: (token: string) => {
    Cookies.set("auth_token", token);
    set({ token, isAuthenticated: !!token, initializing: false });
  },
  logout: () => {
    Cookies.remove("auth_token");
    set({ token: null, isAuthenticated: false });
  },
  setInitializing: (init: boolean) => set({ initializing: init }),
}));
