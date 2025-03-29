import { useAuthStore } from "../../modules/auth/infrastructure/auth.state";

export const storeRegistry = {
  auth: useAuthStore,
};
