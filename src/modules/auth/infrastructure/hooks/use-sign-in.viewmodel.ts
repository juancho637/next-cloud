import { useState, useEffect, useRef } from "react";
import { SignInUseCase } from "../../application/sign-in.usecase";
import { appContainer } from "@/shared/di/app.container";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../auth.state";

export const useSignInViewModel = () => {  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { setToken, loading, setLoading, token } = useAuthStore();
  const router = useRouter();
  const signInUseCase = useRef<SignInUseCase | null>(null);

  useEffect(() => {
    console.log("log from useSignInViewModel");
    if (!signInUseCase.current) {
      try {
        signInUseCase.current = appContainer.get<SignInUseCase>("SignInUseCase");
        
        console.log("✅ SignInUseCase obtenido correctamente.");
      } catch (err) {
        console.error("🚨 Error obteniendo SignInUseCase:", err);
      }
    }
  }, []);

  const handleSignIn = async (): Promise<void> => {
    if (!signInUseCase.current) {
      setError("Dependencias aún no están listas.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const authUser = await signInUseCase.current.execute(email, password);
      console.log(`user: ${JSON.stringify(authUser)}`);
      
      setToken(authUser.accessToken);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      router.push("/dashboard"); // Evita que usuarios autenticados vean la página de login
    }
  }, [token, router]);

  return { email, setEmail, password, setPassword, loading, error, handleSignIn };
};
