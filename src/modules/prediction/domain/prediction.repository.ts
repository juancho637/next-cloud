export interface ClassificationData {
  route_type: number;
  start_scan_to_end_scan: number;
  cutoff_factor: number;
  actual_distance_to_destination: number;
  actual_time: number;
  osrm_time: number;
  osrm_distance: number;
  factor: number;
  segment_actual_time: number;
  segment_factor: number;
}

export interface PredictionData {
  route_type: number;
  start_scan_to_end_scan: number;
  cutoff_factor: number;
  actual_distance_to_destination: number;
  osrm_time: number;
  osrm_distance: number;
  factor: number;
  segment_actual_time: number;
  segment_factor: number;
  is_delayed: number;
}

export interface PredictionRepository {
  classify(data: ClassificationData): Promise<number>;
  predict(data: PredictionData): Promise<number>;
}
