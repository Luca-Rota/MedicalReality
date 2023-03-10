import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { prepareApp } from './prepare-app';

async function bootstrap() {

  const port = process.env.PORT ? parseInt(process.env.PORT) : 3500;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  prepareApp(app);

  await app.listen(port);

  console.log('Backend started on', port);
}

bootstrap().catch((error) => {
  console.error('Error on startup', error);

  process.exit(1);
});

