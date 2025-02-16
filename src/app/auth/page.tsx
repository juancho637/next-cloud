"use client";

import { useSignInViewModel } from "@/modules/auth/infrastructure/hooks/use-sign-in.viewmodel";

export default function SignInScreen() {
  const { email, setEmail, password, setPassword, loading, error, handleSignIn } = useSignInViewModel();

  return (
    <main>
      <h1>Iniciar Sesión</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
        <button type="submit" disabled={loading}>{loading ? "Cargando..." : "Iniciar Sesión"}</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}
