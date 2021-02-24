import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import session from 'express-session';
import passport from 'passport';
import secureSession from 'fastify-secure-session';
import { FastifyAdapter, NestFastifyApplication, } from '@nestjs/platform-fastify';

import { AppModule } from "./app.module";
  
const PORT = process.env.PORT || 8000;
console.log({ PORT });

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule,
    new FastifyAdapter()
  );
  
  app.enableCors({
    origin: ['http://localhost:3000'],
  });

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     transform: true,
  //     forbidNonWhitelisted: true,
  //     transformOptions: {
  //       enableImplicitConversion: true,
  //     },
  //   })
  // );

  // app.register(secureSession, {
  //   secret: 'averylogphrasebiggerthanthirtytwochars',
  //   salt: 'mq9hDxBVDbspDR6n',
  // });

  app.use(
    session({
      secret: 'nest',
      resave: false,
      saveUninitialized: false,
    }),
  );
  
  await app.listen(PORT);
}
bootstrap();
