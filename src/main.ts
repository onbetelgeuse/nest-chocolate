import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { ConfigService } from './config/config.service';
import { Logger } from '@nestjs/common';

export const BASE_PATH = 'api';

async function bootstrap() {
  const env = process.env.NODE_ENV;

  if (!env) {
    Logger.log('No NODE_ENV environment variable specified, exiting.');
    return;
  }

  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.enableCors();
  // app.use(
  //   session({
  //     resave: false,
  //     secret: configService.jwtSecret,
  //     saveUninitialized: true,
  //   }),
  // );

  app.setGlobalPrefix(BASE_PATH);
  await app.listen(port);
  Logger.log(`Listening on http://localhost:${port}`);
}
bootstrap();
