import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Student } from '@vrsoftware/entities';

import { StudentsService } from '@vrsoftware/nest-students-module';

@Controller()
export class SyncStudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @EventPattern('student_data_changed')
  async syncStudent(student: Student): Promise<void> {
    await this.studentsService.sync(student);
  }
}
