import { ApiProperty } from '@nestjs/swagger';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Student } from './student.entity';
import { Course } from './course.entity';

@Entity({
  name: 'students_courses',
})
export class StudentCourse {
  @PrimaryColumn()
  @ApiProperty({
    format: 'uuid',
  })
  student_id: string;

  @PrimaryColumn()
  @ApiProperty({
    format: 'uuid',
  })
  course_id: string;

  @ManyToOne(() => Student, (student) => student.studentCourse)
  student: Student;

  @ManyToOne(() => Course, (course) => course.studentCourse)
  course: Course;
}
