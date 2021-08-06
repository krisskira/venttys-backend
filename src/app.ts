import { Environment, iApplication } from "./infrastructure/interfaces/application.interface";

export async function bootstrap(app: iApplication, env: Environment = "production", port: string = "3000") {
  const _port = parseInt(port, 10);
  app.start({ port: _port, env });
}
