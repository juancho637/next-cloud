import { AuthModule } from "./auth/infrastructure/auth.module";

export class AppRegistry {
  static registerModules() {
    console.log("🔹 Registrando módulos...");
    AuthModule.register();
    console.log("✅ Módulos registrados correctamente.");
  }
}
