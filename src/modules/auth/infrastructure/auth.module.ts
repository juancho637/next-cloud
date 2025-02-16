import { appContainer } from "@/shared/di/app.container";
import { SignInUseCase } from "../application/sign-in.usecase";
import { AuthRepository } from "../domain/auth-repository";
import { AuthV1Repository } from "./repositories/auth-v1.repository";

export class AuthModule {
  static register() {
    appContainer.bind<AuthRepository>("AuthRepository").to(AuthV1Repository);
    appContainer.bind<SignInUseCase>("SignInUseCase").to(SignInUseCase);
  }
}
