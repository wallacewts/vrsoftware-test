import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { Student } from './student.entity';
import { StudentCourse } from './student-course';

@Entity({
  name: 'courses',
})
export class Course {
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
  description: string;

  @Column()
  @ApiProperty()
  @IsNotEmpty()
  syllabus: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @DeleteDateColumn()
  @ApiProperty()
  deletedAt: Date;

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
