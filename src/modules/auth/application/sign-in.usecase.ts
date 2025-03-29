import { AuthRepository } from "../domain/auth-repository";
import { AuthUser } from "../domain/auth-user";

export class SignInUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<AuthUser> {
    if (!email.length) throw new Error("Userername not be empty");

    if (!password.length) throw new Error("Password not be empty");

    return await this.authRepository.signIn(email, password);
  }
}
