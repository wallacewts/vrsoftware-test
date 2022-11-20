import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'reflect-metadata';

import { AppModule } from './app/app.module';

// async function bootstrapMicroservice() {
//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//     AppModule,
//     {
//       transport: Transport.RMQ,
//       options: {
//         urls: [process.env.RABBIT_MQ_HOST],
//         queue: 'admin_api_queue',
//         queueOptions: {
//           durable: false,
//         },
//       },
//     }
//   );

//   await app.listen();
//   Logger.log(`🚀 Admin API Microservice is listening`);
// }

function configSwagger(app, globalPrefix) {
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Admin Api')
      .setDescription('The Admin API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(globalPrefix, app, document);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose'],
  });
  const globalPrefix = process.env.ADMIN_API_GLOBAL_PREFIX;
  const port = process.env.ADMIN_API_PORT || 3333;

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  configSwagger(app, globalPrefix);
  await app.listen(port, '0.0.0.0', () => {
    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    );
  });
}

bootstrap();
// bootstrapMicroservice();
