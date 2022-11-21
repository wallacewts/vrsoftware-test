import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CourseRoutingModule } from './course-routing.module';

@NgModule({
  declarations: [CourseRoutingModule.pages],
  imports: [SharedModule, CourseRoutingModule],
})
export class CourseModule {}
