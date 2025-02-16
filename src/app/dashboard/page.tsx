"use client";

import { useAuthStore } from "@/modules/auth/infrastructure/auth.state";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { isAuthenticated, initializing, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!initializing && !isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, initializing, router]);

  // Mientras se inicializa, se puede mostrar un spinner o nada
  if (initializing) {
    return <div>Cargando...</div>;
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Bienvenido al panel de usuario.</p>
      <button onClick={logout}>Cerrar sesión</button>
    </main>
  );
}
