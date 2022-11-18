import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'reflect-metadata';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose'],
  });

  const globalPrefix = 'admin-api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.ADMIN_API_PORT || 3333;
  const config = new DocumentBuilder()
    .setTitle('Admin Api')
    .setDescription('The Admin API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup(globalPrefix, app, document);
  await app.listen(port, '0.0.0.0', () => {
    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    );
  });
}

bootstrap();
