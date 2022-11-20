import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseRoutingModule } from './course-routing.module';

@NgModule({
  declarations: [CourseRoutingModule.pages],
  imports: [CommonModule, CourseRoutingModule],
})
export class CourseModule {}
