import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'admin-api';
  const port = process.env.ADMIN_API_PORT || 3333;

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port, '0.0.0.0', () => {
    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    );
  });
}

bootstrap();
