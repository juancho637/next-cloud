// "use client";

// import { useAuthStore } from "@modules/auth/infrastructure";
// import Link from "next/link";

// export default function HomePage() {
//   const { isAuthenticated, initializing } = useAuthStore();

//   if (initializing) {
//     return <div>Cargando...</div>;
//   }

//   return (
//     <main>
//       <h1>Bienvenido a Next.js con Clean Architecture 🚀</h1>
//       {isAuthenticated ? (
//         <Link href="/dashboard" className="text-blue-600 hover:underline">
//           Dashboard
//         </Link>
//       ) : (
//         <p>
//           <Link href="/sign-in" className="text-blue-600 hover:underline">
//             Iniciar sesión
//           </Link>
//         </p>
//       )}
//     </main>
//   );
// }

"use client";

import React from "react";
// import Link from "next/link";
import Image from "next/image";
import { usePredictionViewModel } from "@modules/prediction/infrastructure/hooks/use-prediction.viewmodel";

export default function HomePage() {
  const {
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
  } = usePredictionViewModel();

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-rose-50 via-purple-100 to-blue-100 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
              <Image
                src="https://picsum.photos/96"
                alt="Logo"
                fill
                className="p-1 bg-white rounded-xl shadow-md object-cover"
              />
            </div>
            <h1 className="text-xl font-bold">Sistema de Predicción</h1>
          </div>
          <nav>
            {/* <Link href="/dashboard" className="text-blue-600 hover:underline">
              Dashboard
            </Link> */}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario de Clasificación */}
          <div className="bg-white shadow-xl rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
              Formulario de Clasificación
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleClassificationSubmit();
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="route_type_clas"
                    className="text-sm text-gray-600"
                  >
                    Tipo de ruta (route_type):
                  </label>
                  <input
                    id="route_type_clas"
                    name="route_type"
                    type="number"
                    value={classificationFormData.route_type}
                    onChange={handleClassificationChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="start_scan_clas"
                    className="text-sm text-gray-600"
                  >
                    Tiempo inicio-fin escaneo:
                  </label>
                  <input
                    id="start_scan_clas"
                    name="start_scan_to_end_scan"
                    type="number"
                    value={classificationFormData.start_scan_to_end_scan}
                    onChange={handleClassificationChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="cutoff_factor_clas"
                    className="text-sm text-gray-600"
                  >
                    Factor de corte (cutoff_factor):
                  </label>
                  <input
                    id="cutoff_factor_clas"
                    name="cutoff_factor"
                    type="number"
                    value={classificationFormData.cutoff_factor}
                    onChange={handleClassificationChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="actual_distance_clas"
                    className="text-sm text-gray-600"
                  >
                    Distancia real al destino:
                  </label>
                  <input
                    id="actual_distance_clas"
                    name="actual_distance_to_destination"
                    type="number"
                    value={
                      classificationFormData.actual_distance_to_destination
                    }
                    onChange={handleClassificationChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="actual_time_clas"
                    className="text-sm text-gray-600"
                  >
                    Tiempo real (actual_time):
                  </label>
                  <input
                    id="actual_time_clas"
                    name="actual_time"
                    type="number"
                    value={classificationFormData.actual_time}
                    onChange={handleClassificationChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="osrm_time_clas"
                    className="text-sm text-gray-600"
                  >
                    Tiempo OSRM (osrm_time):
                  </label>
                  <input
                    id="osrm_time_clas"
                    name="osrm_time"
                    type="number"
                    value={classificationFormData.osrm_time}
                    onChange={handleClassificationChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="osrm_distance_clas"
                    className="text-sm text-gray-600"
                  >
                    Distancia OSRM (osrm_distance):
                  </label>
                  <input
                    id="osrm_distance_clas"
                    name="osrm_distance"
                    type="number"
                    value={classificationFormData.osrm_distance}
                    onChange={handleClassificationChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="factor_clas"
                    className="text-sm text-gray-600"
                  >
                    Factor (factor):
                  </label>
                  <input
                    id="factor_clas"
                    name="factor"
                    type="number"
                    value={classificationFormData.factor}
                    onChange={handleClassificationChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="segment_actual_time_clas"
                    className="text-sm text-gray-600"
                  >
                    Tiempo real del segmento:
                  </label>
                  <input
                    id="segment_actual_time_clas"
                    name="segment_actual_time"
                    type="number"
                    value={classificationFormData.segment_actual_time}
                    onChange={handleClassificationChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="segment_factor_clas"
                    className="text-sm text-gray-600"
                  >
                    Factor del segmento:
                  </label>
                  <input
                    id="segment_factor_clas"
                    name="segment_factor"
                    type="number"
                    value={classificationFormData.segment_factor}
                    onChange={handleClassificationChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-6"
              >
                {loadingClassification ? "Enviando..." : "Enviar Clasificación"}
              </button>
            </form>
            {classificationResult !== null && (
              <div
                className={`mt-4 p-4 rounded-md ${
                  classificationResult === 1
                    ? "bg-yellow-100 border border-yellow-400"
                    : "bg-green-100 border border-green-400"
                }`}
              >
                <p className="font-medium">
                  {classificationResult === 1
                    ? "Se detectó una posible demora en la entrega."
                    : "No se detectaron demoras en la entrega."}
                </p>
              </div>
            )}
            {errorClassification && (
              <p className="mt-2 text-red-600 font-semibold">
                {errorClassification}
              </p>
            )}
          </div>

          {/* Formulario de Predicción (solo si clasificación es 1) */}
          {classificationResult === 1 && (
            <div className="bg-white shadow-xl rounded-3xl p-8">
              <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                Formulario de Predicción
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePredictionSubmit();
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="route_type_pred"
                      className="text-sm text-gray-600"
                    >
                      Tipo de ruta (route_type):
                    </label>
                    <input
                      id="route_type_pred"
                      name="route_type"
                      type="number"
                      value={predictionFormData.route_type}
                      onChange={handlePredictionChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="start_scan_pred"
                      className="text-sm text-gray-600"
                    >
                      Tiempo inicio-fin escaneo:
                    </label>
                    <input
                      id="start_scan_pred"
                      name="start_scan_to_end_scan"
                      type="number"
                      value={predictionFormData.start_scan_to_end_scan}
                      onChange={handlePredictionChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="cutoff_factor_pred"
                      className="text-sm text-gray-600"
                    >
                      Factor de corte (cutoff_factor):
                    </label>
                    <input
                      id="cutoff_factor_pred"
                      name="cutoff_factor"
                      type="number"
                      value={predictionFormData.cutoff_factor}
                      onChange={handlePredictionChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="actual_distance_pred"
                      className="text-sm text-gray-600"
                    >
                      Distancia real al destino:
                    </label>
                    <input
                      id="actual_distance_pred"
                      name="actual_distance_to_destination"
                      type="number"
                      value={predictionFormData.actual_distance_to_destination}
                      onChange={handlePredictionChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="osrm_time_pred"
                      className="text-sm text-gray-600"
                    >
                      Tiempo OSRM (osrm_time):
                    </label>
                    <input
                      id="osrm_time_pred"
                      name="osrm_time"
                      type="number"
                      value={predictionFormData.osrm_time}
                      onChange={handlePredictionChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="osrm_distance_pred"
                      className="text-sm text-gray-600"
                    >
                      Distancia OSRM (osrm_distance):
                    </label>
                    <input
                      id="osrm_distance_pred"
                      name="osrm_distance"
                      type="number"
                      value={predictionFormData.osrm_distance}
                      onChange={handlePredictionChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="factor_pred"
                      className="text-sm text-gray-600"
                    >
                      Factor (factor):
                    </label>
                    <input
                      id="factor_pred"
                      name="factor"
                      type="number"
                      value={predictionFormData.factor}
                      onChange={handlePredictionChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="segment_actual_time_pred"
                      className="text-sm text-gray-600"
                    >
                      Tiempo real del segmento:
                    </label>
                    <input
                      id="segment_actual_time_pred"
                      name="segment_actual_time"
                      type="number"
                      value={predictionFormData.segment_actual_time}
                      onChange={handlePredictionChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="segment_factor_pred"
                      className="text-sm text-gray-600"
                    >
                      Factor del segmento:
                    </label>
                    <input
                      id="segment_factor_pred"
                      name="segment_factor"
                      type="number"
                      value={predictionFormData.segment_factor}
                      onChange={handlePredictionChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="is_delayed_pred"
                      className="text-sm text-gray-600"
                    >
                      ¿Está retrasado? (0 o 1):
                    </label>
                    <input
                      id="is_delayed_pred"
                      name="is_delayed"
                      type="number"
                      value={predictionFormData.is_delayed}
                      onChange={handlePredictionChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-6"
                >
                  {loadingPrediction ? "Enviando..." : "Enviar Predicción"}
                </button>
              </form>
              {predictionResult !== null && (
                <div className="mt-4 p-4 bg-blue-100 border border-blue-400 rounded-md">
                  <p className="font-medium">
                    Tiempo estimado de demora:{" "}
                    <span className="text-blue-700 font-bold">
                      {predictionResult} minutos
                    </span>
                  </p>
                </div>
              )}
              {errorPrediction && (
                <p className="mt-2 text-red-600 font-semibold">
                  {errorPrediction}
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
