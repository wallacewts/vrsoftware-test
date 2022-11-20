import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { Student } from '@vrsoftware/entities';

import { StudentsService } from '@vrsoftware/nest-students-module';
import { GetAction } from '@vrsoftware/utils';
import { ConsumeMessage } from 'amqplib';

@Controller()
export class SyncStudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @RabbitSubscribe({
    exchange: 'amq.topic',
    routingKey: 'model.student.*',
    queue: 'micro-admin-api/student-sync',
  })
  async syncStudent(
    student: Student,
    amqpMessage: ConsumeMessage
  ): Promise<void> {
    const action = GetAction(amqpMessage.fields.routingKey);

    switch (action) {
      case 'updated':
        await this.studentsService.sync(student);
        break;
    }
  }
}
