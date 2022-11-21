import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { Student } from './student.entity';
import { StudentCourse } from './student-course';
import { ICourse } from './course.interface';

@Entity({
  name: 'courses',
})
export class Course implements ICourse {
  @PrimaryColumn()
  @ApiProperty({
    format: 'uuid',
  })
  id: string;

  @Column()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @Column()
  @ApiProperty()
  @IsNotEmpty()
  syllabus: string;

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;

  @DeleteDateColumn()
  @ApiProperty()
  deleted_at: Date;

  @ManyToMany(() => Student, (student) => student.courses)
  students: Student[];

  @OneToMany(() => StudentCourse, (studentCourse) => studentCourse.course)
  studentCourse: StudentCourse;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
