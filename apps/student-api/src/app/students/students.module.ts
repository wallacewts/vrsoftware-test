import { Module } from '@nestjs/common';
import { NestStudentsModule } from '@vrsoftware/nest-students-module';
import { StudentsController } from './students.controller';

@Module({
  imports: [NestStudentsModule],
  exports: [NestStudentsModule],
  controllers: [StudentsController],
})
export class StudentsModule {}
