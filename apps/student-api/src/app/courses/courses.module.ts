import { Module } from '@nestjs/common';
import { NestCoursesModule } from '@vrsoftware/nest-courses-module';
import { SyncCoursesController } from './sync-courses.controller';

@Module({
  imports: [NestCoursesModule],
  exports: [NestCoursesModule],
  controllers: [SyncCoursesController],
})
export class CoursesModule {}
