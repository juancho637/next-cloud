import type {
  PredictionData,
  PredictionRepository,
} from "../domain/prediction.repository";

export class PredictUseCase {
  constructor(private readonly predictionRepository: PredictionRepository) {}

  async execute(data: PredictionData): Promise<number> {
    // Validaciones
    if (data.is_delayed !== 1)
      throw new Error("Solo se puede predecir cuando hay demora");

    // Más validaciones según sea necesario...

    return await this.predictionRepository.predict(data);
  }
}
