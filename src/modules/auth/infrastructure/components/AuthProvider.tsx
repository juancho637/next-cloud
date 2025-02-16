"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/modules/auth/infrastructure/auth.state";
import { AppRegistry } from "@/modules/app-registry.module";

export default function AuthProvider() {
    const { setToken, setInitializing } = useAuthStore();
  
    useEffect(() => {
      // Inicializa las dependencias en el cliente
      AppRegistry.registerModules();
  
      // Lee el token desde las cookies
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth_token="))
        ?.split("=")[1];
      if (token) {
        setToken(token);
      } else {
        // Finaliza la inicialización si no hay token
        setInitializing(false);
      }
    }, [setToken, setInitializing]);
  
    return null;
  }
