import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
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
  id: string;

  @Column()
  @ApiProperty({
    format: 'uuid',
  })
  studentId: string;

  @Column()
  @ApiProperty({
    format: 'uuid',
  })
  courseId: string;

  @ManyToOne(() => Student, (student) => student.studentCourse)
  student: Student;

  @ManyToOne(() => Course, (course) => course.studentCourse)
  course: Course;

  @BeforeInsert()
  setId() {
    this.id = uuidv4();
  }

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
