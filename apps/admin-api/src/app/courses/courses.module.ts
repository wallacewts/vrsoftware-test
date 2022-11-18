import { Module } from '@nestjs/common';
import { CoursesModule as SharedCoursesModule } from '@vrsoftware/nest-courses-module';
import { CoursesController } from './courses.controller';

@Module({
  imports: [SharedCoursesModule],
  exports: [SharedCoursesModule],
  controllers: [CoursesController],
})
export class CoursesModule {}
