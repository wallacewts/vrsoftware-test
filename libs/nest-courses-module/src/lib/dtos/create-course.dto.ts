import { OmitType, PartialType } from '@nestjs/swagger';
import { Course } from '@vrsoftware/entities';

export class CreateCourseDto extends PartialType(
  OmitType(Course, [
    'id',
    'createdAt',
    'deletedAt',
    'updatedAt',
    'studentCourse',
    'students',
  ])
) {}
