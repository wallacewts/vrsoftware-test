import { Module } from '@nestjs/common';
import { StudentsModule as SharedStudentsModule } from '@vrsoftware/nest-students-module';
import { StudentsController } from './students.controller';

@Module({
  imports: [SharedStudentsModule],
  exports: [SharedStudentsModule],
  controllers: [StudentsController],
})
export class StudentsModule {}
