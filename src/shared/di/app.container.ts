import "reflect-metadata";
import { Container } from "inversify";
import { ApiClient } from "../services/api-client.service";

export const appContainer = new Container();

// 📌 Crear y registrar `ApiClient` como singleton
const apiClient = new ApiClient(
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"
);

appContainer.bind<ApiClient>("ApiClient").toConstantValue(apiClient);
