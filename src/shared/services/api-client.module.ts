import { appContainer } from "../di/app.container";
import { API_CLIENT_PROVIDERS_TYPE } from "./api-client-providers.type";
import { ApiClient } from "./api-client.service";

export class ApiClientModule {
  static register() {
    if (
      appContainer.isBound(API_CLIENT_PROVIDERS_TYPE.ApiClientModuleRegistered)
    ) {
      console.log("⚠️ ApiClientModule is already registered.");
      return;
    }

    console.log("📌 ApiClientModule registering...");
    const apiClient = new ApiClient(
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"
    );

    appContainer
      .bind<ApiClient>(API_CLIENT_PROVIDERS_TYPE.ApiClient)
      .toConstantValue(apiClient);
    appContainer
      .bind<boolean>(API_CLIENT_PROVIDERS_TYPE.ApiClientModuleRegistered)
      .toConstantValue(true);
    console.log("✅ ApiClientModule registered.");
  }
}
