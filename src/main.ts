import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
const PORT = process.env.PORT || 8000;
console.log({ PORT });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
