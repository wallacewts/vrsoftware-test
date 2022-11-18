import { OmitType, PartialType } from '@nestjs/swagger';
import { Course } from '@vrsoftware/entities';

export class CreateCourseDto extends PartialType(
  OmitType(Course, [
    'id',
    'created_at',
    'deleted_at',
    'updated_at',
    'studentCourse',
    'students',
  ])
) {}
