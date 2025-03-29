"use client";

import { useEffect } from "react";
import { AppRegistry } from "../../modules/app-registry.module";
import { useAuthStore } from "@modules/auth/infrastructure";

export default function ClientInitializer() {
  const { setToken, setInitializing } = useAuthStore();

  useEffect(() => {
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
