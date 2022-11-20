import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Course } from '@vrsoftware/entities';

import { CoursesService } from '@vrsoftware/nest-courses-module';

@Controller()
export class SyncCoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @EventPattern('course_data_changed')
  async syncCourse(course: Course) {
    await this.coursesService.sync(course);
  }
}
