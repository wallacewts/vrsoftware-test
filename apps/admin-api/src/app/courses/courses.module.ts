import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NestCoursesModule } from '@vrsoftware/nest-courses-module';
import { CoursesController } from './courses.controller';

@Module({
  imports: [
    NestCoursesModule,
    ClientsModule.register([
      {
        name: 'STUDENT_API_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_MQ_HOST],
          queue: 'student_api_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  exports: [NestCoursesModule],
  controllers: [CoursesController],
})
export class CoursesModule {}
