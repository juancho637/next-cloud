"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/modules/auth/infrastructure/auth.state";
import { AppRegistry } from "@/modules/app-registry.module";

export default function AuthProvider() {
  const { setToken } = useAuthStore();

  useEffect(() => {
    AppRegistry.registerModules();

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];
    console.log("token", token);
    
    if (token) {
      setToken(token);
    }
  }, []);

  return null; // No renderiza nada
}
