import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course, Student, StudentCourse } from '@vrsoftware/entities';
import { StudentsService } from './services/students/students.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Course, StudentCourse])],
  providers: [StudentsService],
  exports: [StudentsService, TypeOrmModule],
})
export class StudentsModule {}
