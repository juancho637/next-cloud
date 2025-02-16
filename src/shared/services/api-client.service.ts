import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";

export interface ApiResponse<T> {
  data: T;
  path: string;
  duration: string;
  method: string;
}

export class ApiError extends Error {
  statusCode: number;
  details?: unknown;
  path?: string;
  method?: string;
  duration?: string;

  constructor(info: {message: string, statusCode: number, details?: unknown, path?: string, method?: string, duration?: string}) {
    super(info.message);
    this.statusCode = info.statusCode;
    this.details = info.details;
    this.path = info.path;
    this.method = info.method;
    this.duration = info.duration;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Agregar lógica para incluir un token aquí si es necesario
        return config;
      },
      (error: unknown) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        console.error("🛑 API Error:", error);

        if (error.response) {
          const data = error.response.data as { codeError: string, message: string, path: string, method: string, duration: string };
          
          throw new ApiError(
            {
              message: data.message,
              statusCode: error.response.status,
              details: data.codeError,
            }
          );
        } else if (error.request) {
          throw new ApiError({
            message: "No se pudo conectar al servidor",
            statusCode: 503,
          });
        } else {
          throw new ApiError({
            message: "Error inesperado",
            statusCode: 500,
          });
        }
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.axiosInstance.get(url, config);
    
    return response.data.data;
  }

  async post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.axiosInstance.post(url, data, config);

    return response.data.data;
  }

  async put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.axiosInstance.put(url, data, config);

    return response.data.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.axiosInstance.delete(url, config);

    return response.data.data;
  }
}
