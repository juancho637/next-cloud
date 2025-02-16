import { AuthModule } from "./auth/infrastructure/auth.module";

export class AppRegistry {
  static registerModules() {
    if (globalThis.dependenciesRegistered) {
      console.log("⚠️ Las dependencias ya están registradas.");
      return;
    }

    console.log("🔹 Registrando módulos...");
    AuthModule.register();
    globalThis.dependenciesRegistered = true;
    console.log("✅ Módulos registrados correctamente.");
  }
}
