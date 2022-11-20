import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { NestCoursesModule } from '@vrsoftware/nest-courses-module';
import { CoursesController } from './courses.controller';

@Module({
  imports: [
    NestCoursesModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: process.env.RABBIT_MQ_HOST,
      enableControllerDiscovery: true,
      connectionInitOptions: { wait: true },
    }),
  ],
  exports: [NestCoursesModule],
  controllers: [CoursesController],
})
export class CoursesModule {}
