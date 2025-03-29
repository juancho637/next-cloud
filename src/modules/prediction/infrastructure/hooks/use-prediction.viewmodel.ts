"use client";

import { useState, useEffect, useRef } from "react";
import { appContainer } from "@common/di";
import { PREDICTION_PROVIDERS_TYPE } from "../prediction.module";
import type { ClassifyUseCase } from "../../application/classify.usecase";
import type { PredictUseCase } from "../../application/predict.usecase";
import type {
  ClassificationData,
  PredictionData,
} from "../../domain/prediction.repository";

export const usePredictionViewModel = () => {
  // Estados para formulario de clasificación
  const [classificationFormData, setClassificationFormData] =
    useState<ClassificationData>({
      route_type: 0,
      start_scan_to_end_scan: 86,
      cutoff_factor: 27,
      actual_distance_to_destination: 27.63727903820737,
      actual_time: 40,
      osrm_time: 28,
      osrm_distance: 32.5395,
      factor: 1.428571428571429,
      segment_actual_time: 16,
      segment_factor: 2.285714285714286,
    });

  // Estados para formulario de predicción
  const [predictionFormData, setPredictionFormData] = useState<PredictionData>({
    route_type: 0,
    start_scan_to_end_scan: 0,
    cutoff_factor: 0,
    actual_distance_to_destination: 0,
    osrm_time: 0,
    osrm_distance: 0,
    factor: 0,
    segment_actual_time: 0,
    segment_factor: 0,
    is_delayed: 0,
  });

  // Estados para resultados
  const [classificationResult, setClassificationResult] = useState<
    number | null
  >(null);
  const [predictionResult, setPredictionResult] = useState<number | null>(null);

  // Estados de carga y error separados
  const [loadingClassification, setLoadingClassification] =
    useState<boolean>(false);
  const [loadingPrediction, setLoadingPrediction] = useState<boolean>(false);
  const [errorClassification, setErrorClassification] = useState<string | null>(
    null
  );
  const [errorPrediction, setErrorPrediction] = useState<string | null>(null);

  // Referencias a los casos de uso
  const classifyUseCase = useRef<ClassifyUseCase | null>(null);
  const predictUseCase = useRef<PredictUseCase | null>(null);

  // Inicialización de los casos de uso
  useEffect(() => {
    if (!classifyUseCase.current || !predictUseCase.current) {
      try {
        classifyUseCase.current = appContainer.get<ClassifyUseCase>(
          PREDICTION_PROVIDERS_TYPE.ClassifyUseCase
        );
        predictUseCase.current = appContainer.get<PredictUseCase>(
          PREDICTION_PROVIDERS_TYPE.PredictUseCase
        );
        console.log("✅ Prediction UseCases obtenidos correctamente.");
      } catch (err) {
        console.error("🚨 Error obteniendo Prediction UseCases:", err);
        setErrorClassification("Error al inicializar el módulo de predicción");
        setErrorPrediction("Error al inicializar el módulo de predicción");
      }
    }
  }, []);

  // Manejadores para cambios en los formularios
  const handleClassificationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setClassificationFormData({
      ...classificationFormData,
      [name]: Number(value) || 0,
    });
  };

  const handlePredictionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPredictionFormData({
      ...predictionFormData,
      [name]: Number(value) || 0,
    });
  };

  // Manejadores para envío de formularios
  const handleClassificationSubmit = async (): Promise<void> => {
    if (!classifyUseCase.current) {
      setErrorClassification("El módulo de clasificación no está inicializado");
      return;
    }
    setLoadingClassification(true);
    setErrorClassification(null);
    try {
      const result = await classifyUseCase.current.execute(
        classificationFormData
      );
      const numericResult = Number(result);
      setClassificationResult(numericResult);

      if (numericResult === 1) {
        setPredictionFormData({
          ...predictionFormData,
          is_delayed: 1,
          route_type: classificationFormData.route_type,
          start_scan_to_end_scan: classificationFormData.start_scan_to_end_scan,
          cutoff_factor: classificationFormData.cutoff_factor,
          actual_distance_to_destination:
            classificationFormData.actual_distance_to_destination,
          osrm_time: classificationFormData.osrm_time,
          osrm_distance: classificationFormData.osrm_distance,
          factor: classificationFormData.factor,
          segment_actual_time: classificationFormData.segment_actual_time,
          segment_factor: classificationFormData.segment_factor,
        });
      }
    } catch (err) {
      setErrorClassification(
        err instanceof Error
          ? err.message
          : "Error desconocido en la clasificación"
      );
    } finally {
      setLoadingClassification(false);
    }
  };

  const handlePredictionSubmit = async (): Promise<void> => {
    if (!predictUseCase.current) {
      setErrorPrediction("El módulo de predicción no está inicializado");
      return;
    }
    setLoadingPrediction(true);
    setErrorPrediction(null);
    try {
      const result = await predictUseCase.current.execute(predictionFormData);
      setPredictionResult(result);
    } catch (err) {
      setErrorPrediction(
        err instanceof Error
          ? err.message
          : "Error desconocido en la predicción"
      );
    } finally {
      setLoadingPrediction(false);
    }
  };

  return {
    classificationFormData,
    predictionFormData,
    classificationResult,
    predictionResult,
    loadingClassification,
    loadingPrediction,
    errorClassification,
    errorPrediction,
    handleClassificationChange,
    handlePredictionChange,
    handleClassificationSubmit,
    handlePredictionSubmit,
    setClassificationFormData,
    setPredictionFormData,
    setClassificationResult,
    setPredictionResult,
    setErrorClassification,
    setErrorPrediction,
  };
};
