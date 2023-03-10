/* istanbul ignore file */

import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';

import { GroupValidationPipe } from 'libs/common/src/pipes/group-validation.pipe';

export function prepareApp(app: NestExpressApplication | INestApplication) {
  app.useGlobalPipes(
    new GroupValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  app.enableCors({
    credentials: true,
  });
  app.use(json({ limit: '25mb' }));
  app.use(urlencoded({ extended: false, limit: '25mb' }));

  if ('set' in app) {
    app.set('trust proxy', true);
  }
}
