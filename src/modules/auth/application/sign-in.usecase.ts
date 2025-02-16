import { AuthRepository } from "../domain/auth-repository";
import { AuthUser } from "../domain/auth-user";

export class SignInUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<AuthUser> {
      // if (!email.includes("@")) throw new Error("Correo inválido");
    
    if (password.length < 6) throw new Error("Contraseña muy corta");

    return await this.authRepository.signIn(email, password);
  }
}
