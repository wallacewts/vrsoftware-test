import { OmitType, PartialType } from '@nestjs/swagger';
import { Student } from '@vrsoftware/entities';

export class UpdateStudentDto extends PartialType(
  OmitType(Student, [
    'courses',
    'created_at',
    'deleted_at',
    'id',
    'studentCourse',
    'updated_at',
  ])
) {}
