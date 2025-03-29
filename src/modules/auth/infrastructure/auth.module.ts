import { appContainer } from "@common/di";
import {
  ApiClient,
  API_CLIENT_PROVIDERS_TYPE,
} from "@common/adapters/api-client";
import { AuthRepository } from "../domain/auth-repository";
import { AUTH_PROVIDERS_TYPE } from "../domain/auth-providers.type";
import { SignInUseCase } from "../application/sign-in.usecase";
import { AuthV1Repository } from "./repositories/auth-v1.repository";

export class AuthModule {
  static register() {
    if (appContainer.isBound(AUTH_PROVIDERS_TYPE.AuthModuleRegistered)) {
      console.log("⚠️ AuthModule is already registered.");
      return;
    }

    const apiClient = appContainer.get<ApiClient>(
      API_CLIENT_PROVIDERS_TYPE.ApiClient
    );

    console.log("📌 AuthModule registering...");
    const authRepository = new AuthV1Repository(apiClient);
    const signInUseCase = new SignInUseCase(authRepository);

    appContainer
      .bind<AuthRepository>(AUTH_PROVIDERS_TYPE.AuthRepository)
      .toConstantValue(authRepository);
    appContainer
      .bind<SignInUseCase>(AUTH_PROVIDERS_TYPE.SignInUseCase)
      .toConstantValue(signInUseCase);
    appContainer
      .bind<boolean>(AUTH_PROVIDERS_TYPE.AuthModuleRegistered)
      .toConstantValue(true);
    console.log("✅ AuthModule registered.");
  }
}
