"use client";

import { useAuthStore } from "@/modules/auth/infrastructure/auth.state";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth"); // Redirige a login si no está autenticado
    }
  }, [isAuthenticated, router]);

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Bienvenido al panel de usuario.</p>
      <button onClick={logout}>Cerrar sesión</button>
    </main>
  );
}
