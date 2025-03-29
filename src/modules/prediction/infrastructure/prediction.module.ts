import { appContainer } from "@common/di";
import {
  type ApiClient,
  API_CLIENT_PROVIDERS_TYPE,
} from "@common/adapters/api-client";
import type { PredictionRepository } from "../domain/prediction.repository";
import { ClassifyUseCase } from "../application/classify.usecase";
import { PredictUseCase } from "../application/predict.usecase";
import { PredictionV1Repository } from "./repositories/prediction-v1.repository";

export const PREDICTION_PROVIDERS_TYPE = {
  PredictionModuleRegistered: Symbol("PredictionModuleRegistered"),
  PredictionRepository: Symbol("PredictionRepository"),
  ClassifyUseCase: Symbol("ClassifyUseCase"),
  PredictUseCase: Symbol("PredictUseCase"),
};

export class PredictionModule {
  static register() {
    if (
      appContainer.isBound(PREDICTION_PROVIDERS_TYPE.PredictionModuleRegistered)
    ) {
      console.log("⚠️ PredictionModule is already registered.");
      return;
    }

    const apiClient = appContainer.get<ApiClient>(
      API_CLIENT_PROVIDERS_TYPE.ApiClient
    );

    console.log("📌 PredictionModule registering...");
    const predictionRepository = new PredictionV1Repository(apiClient);
    const classifyUseCase = new ClassifyUseCase(predictionRepository);
    const predictUseCase = new PredictUseCase(predictionRepository);

    appContainer
      .bind<PredictionRepository>(
        PREDICTION_PROVIDERS_TYPE.PredictionRepository
      )
      .toConstantValue(predictionRepository);
    appContainer
      .bind<ClassifyUseCase>(PREDICTION_PROVIDERS_TYPE.ClassifyUseCase)
      .toConstantValue(classifyUseCase);
    appContainer
      .bind<PredictUseCase>(PREDICTION_PROVIDERS_TYPE.PredictUseCase)
      .toConstantValue(predictUseCase);
    appContainer
      .bind<boolean>(PREDICTION_PROVIDERS_TYPE.PredictionModuleRegistered)
      .toConstantValue(true);
    console.log("✅ PredictionModule registered.");
  }
}
