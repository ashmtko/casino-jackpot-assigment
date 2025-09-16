import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const frontendOrigin = process.env.FRONTEND_ORIGIN

  app.enableCors({ origin: frontendOrigin, credentials: true });
  app.useGlobalPipes(new ValidationPipe());

  // cookie-parser
  app.use(cookieParser());

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
}
bootstrap();
