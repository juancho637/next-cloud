import type {
  ClassificationData,
  PredictionRepository,
} from "../domain/prediction.repository";

export class ClassifyUseCase {
  constructor(private readonly predictionRepository: PredictionRepository) {}

  async execute(data: ClassificationData): Promise<number> {
    // Validaciones
    if (data.route_type < 0)
      throw new Error("El tipo de ruta no puede ser negativo");

    // Más validaciones según sea necesario...

    return await this.predictionRepository.classify(data);
  }
}
