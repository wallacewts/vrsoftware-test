import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { NestStudentsModule } from '@vrsoftware/nest-students-module';
import { StudentsController } from './students.controller';
import { SyncStudentsController } from './sync-students.controller';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: process.env.RABBIT_MQ_HOST,
      enableControllerDiscovery: true,
      connectionInitOptions: { wait: true },
    }),
    NestStudentsModule,
  ],
  exports: [NestStudentsModule],
  controllers: [StudentsController, SyncStudentsController],
})
export class StudentsModule {}
