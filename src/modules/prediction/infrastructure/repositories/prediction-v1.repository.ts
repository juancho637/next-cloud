import type { ApiClient } from "@common/adapters/api-client";
import type {
  ClassificationData,
  PredictionData,
  PredictionRepository,
} from "../../domain/prediction.repository";

export class PredictionV1Repository implements PredictionRepository {
  constructor(private readonly apiClient: ApiClient) {}

  async classify(data: ClassificationData): Promise<number> {
    try {
      // Construimos el payload de clasificación
      const payload = {
        route_type: data.route_type,
        start_scan_to_end_scan: data.start_scan_to_end_scan,
        cutoff_factor: data.cutoff_factor,
        actual_distance_to_destination: data.actual_distance_to_destination,
        actual_time: data.actual_time,
        osrm_time: data.osrm_time,
        osrm_distance: data.osrm_distance,
        factor: data.factor,
        segment_actual_time: data.segment_actual_time,
        segment_factor: data.segment_factor,
      };

      // Llama al endpoint de clasificación a través del ApiClient
      // Se asume que el ApiClient ya está configurado con la base URL
      const result = await this.apiClient.post<{ response: number }>(
        "/call-ai-classification",
        payload
      );

      // Se espera que el endpoint devuelva el primer valor de "Results"
      return result.response;
    } catch (error) {
      console.error("Error en clasificación:", error);
      throw error;
    }
  }

  async predict(data: PredictionData): Promise<number> {
    try {
      const payload = {
        route_type: data.route_type,
        start_scan_to_end_scan: data.start_scan_to_end_scan,
        cutoff_factor: data.cutoff_factor,
        actual_distance_to_destination: data.actual_distance_to_destination,
        osrm_time: data.osrm_time,
        osrm_distance: data.osrm_distance,
        factor: data.factor,
        segment_actual_time: data.segment_actual_time,
        segment_factor: data.segment_factor,
        is_delayed: data.is_delayed,
      };

      const result = await this.apiClient.post<{ response: number }>(
        "/call-ai-prediction",
        payload
      );

      return result.response;
    } catch (error) {
      console.error("Error en predicción:", error);
      throw error;
    }
  }
}
