import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { Logger } from '@nestjs/common';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as csurf from 'csurf';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as path from 'path';

export const BASE_PATH = 'api';

async function bootstrap() {
  const env = process.env.NODE_ENV || 'development';

  if (!env) {
    Logger.log('No NODE_ENV environment variable specified, exiting.');
    return;
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.use(
    session({
      resave: false,
      secret: configService.jwtSecret,
      saveUninitialized: true,
    }),
  );
  app.use(bodyParser.json({ limit: '90mb' }));
  app.use(bodyParser.urlencoded({ limit: '90mb', extended: false }));
  app.use(cookieParser());
  // app.use(csurf({ cookie: true }));
  app.use(helmet());

  app.setGlobalPrefix(BASE_PATH);

  await app.listen(port);
  Logger.log(`Listening on http://localhost:${port}`);
}
bootstrap();
