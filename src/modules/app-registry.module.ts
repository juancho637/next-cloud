import { ApiClientModule } from "@/shared/services/api-client.module";
import { AuthModule } from "./auth/infrastructure/auth.module";

export class AppRegistry {
  static registerModules() {
    console.log("🔹 modules registering...");
    ApiClientModule.register();
    AuthModule.register();
    console.log("✅ modules registered.");
  }
}
