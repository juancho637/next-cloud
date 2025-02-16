import { useState } from "react";
import { SignInUseCase } from "../../application/sign-in.usecase";
import { appContainer } from "@/shared/di/app.container";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../auth.state";

export const useSignInViewModel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { setToken, loading, setLoading } = useAuthStore();
  const router = useRouter();
  const signInUseCase = appContainer.get<SignInUseCase>("SignInUseCase");

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const authUser = await signInUseCase.execute(email, password);
      setToken(authUser.accessToken);
      router.push("/dashboard"); // Redirigir a la página protegida
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, loading, error, handleSignIn };
};
