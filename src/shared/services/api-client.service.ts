import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from "axios";

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
      (error: unknown) => {
        console.error("API Error:", error);
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig<T>): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get<T>(url, config);
    
    return response.data;
  }

  async post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<T>): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post<T>(url, data, config);

    return response.data;
  }

  async put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<T>): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put<T>(url, data, config);

    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig<T>): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete<T>(url, config);

    return response.data;
  }
}
