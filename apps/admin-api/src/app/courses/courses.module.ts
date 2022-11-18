import { Module } from '@nestjs/common';
import { NestCoursesModule } from '@vrsoftware/nest-courses-module';
import { CoursesController } from './courses.controller';

@Module({
  imports: [NestCoursesModule],
  exports: [NestCoursesModule],
  controllers: [CoursesController],
})
export class CoursesModule {}
