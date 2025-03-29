import { ApiClientModule } from "@common/adapters/api-client";
import { AuthModule } from "./auth/infrastructure";
import { PredictionModule } from "./prediction/infrastructure";

export class AppRegistry {
  static registerModules() {
    console.log("🔹 modules registering...");
    ApiClientModule.register();
    AuthModule.register();
    PredictionModule.register();
    console.log("✅ modules registered.");
  }
}
