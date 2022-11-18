import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Course } from './course.entity';
import { v4 as uuidv4 } from 'uuid';
import { StudentCourse } from './student-course';

@Entity({
  name: 'students',
})
export class Student {
  @PrimaryColumn()
  @ApiProperty({
    format: 'uuid',
  })
  @IsUUID()
  id: string;

  @Column()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @DeleteDateColumn()
  @ApiProperty()
  deletedAt: Date;

  @ApiProperty({
    isArray: true,
    type: Course,
  })
  @ManyToMany(() => Course, (course) => course.students, {
    cascade: true,
  })
  @JoinTable({
    name: 'students_courses',
    joinColumn: { name: 'student_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'course_id', referencedColumnName: 'id' },
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Course)
  @ValidateNested({
    each: true,
  })
  courses: Course[];

  @OneToMany(() => StudentCourse, (studentCourse) => studentCourse.student)
  studentCourse: StudentCourse;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
