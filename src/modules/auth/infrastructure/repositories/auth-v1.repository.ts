import { ApiClient } from "@/shared/services/api-client.service";
import { AuthRepository } from "../../domain/auth-repository";
import { AuthUser } from "../../domain/auth-user";

export class AuthV1Repository implements AuthRepository {
  constructor(private readonly apiClient: ApiClient) {}

  async signIn(username: string, password: string): Promise<AuthUser> {
    const response = await this.apiClient.post<AuthUser>("/api/auth/sign-in", {
      username,
      password,
    });

    return response;
  }
}
