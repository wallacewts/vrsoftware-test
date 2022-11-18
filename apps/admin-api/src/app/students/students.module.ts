import { Module } from '@nestjs/common';
import { StudentsModule as SharedStudentsModule } from '@vrsoftware/students';
import { StudentsController } from './students.controller';

@Module({
  imports: [SharedStudentsModule],
  exports: [SharedStudentsModule],
  controllers: [StudentsController],
})
export class StudentsModule {}
