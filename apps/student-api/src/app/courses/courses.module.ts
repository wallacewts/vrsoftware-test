import { Module } from '@nestjs/common';
import { NestCoursesModule } from '@vrsoftware/nest-courses-module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { SyncCoursesController } from './sync-courses.controller';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: process.env.RABBIT_MQ_HOST,
      enableControllerDiscovery: true,
      connectionInitOptions: { wait: true },
    }),
    NestCoursesModule,
  ],
  exports: [NestCoursesModule],
  controllers: [SyncCoursesController],
})
export class CoursesModule {}
