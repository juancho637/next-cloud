import { AuthUser } from "./auth-user";

export interface AuthRepository {
  signIn(username: string, password: string): Promise<AuthUser>;
}
