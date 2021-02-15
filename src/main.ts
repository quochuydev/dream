import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import session from 'express-session';
import passport from 'passport';

import { AppModule } from "./app.module";
  
const PORT = process.env.PORT || 8000;
console.log({ PORT });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  
  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT);
}
bootstrap();
