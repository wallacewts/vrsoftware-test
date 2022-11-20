import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NestStudentsModule } from '@vrsoftware/nest-students-module';
import { StudentsController } from './students.controller';
import { SyncStudentsController } from './sync-students.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ADMIN_API_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_MQ_HOST],
          queue: 'admin_api_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    NestStudentsModule,
  ],
  exports: [NestStudentsModule],
  controllers: [StudentsController, SyncStudentsController],
})
export class StudentsModule {}
