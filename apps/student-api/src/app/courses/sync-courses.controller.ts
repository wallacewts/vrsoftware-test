import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { Course } from '@vrsoftware/entities';
import { GetAction } from '@vrsoftware/utils';

import { CoursesService } from '@vrsoftware/nest-courses-module';

@Controller()
export class SyncCoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @RabbitSubscribe({
    exchange: 'amq.topic',
    routingKey: 'model.course.*',
    queue: 'micro-student-api/course-sync',
  })
  async syncCourse(course: Course, amqpMessage: ConsumeMessage) {
    const action = GetAction(amqpMessage.fields.routingKey);

    switch (action) {
      case 'created':
        await this.coursesService.sync(course);
        break;
      case 'updated':
        await this.coursesService.sync(course);
        break;
    }
  }
}
