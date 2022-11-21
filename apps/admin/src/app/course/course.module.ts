import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SaveCourseDialogComponent } from './components/save-course-dialog/save-course-dialog.component';
import { CourseRoutingModule } from './course-routing.module';

@NgModule({
  declarations: [CourseRoutingModule.pages, SaveCourseDialogComponent],
  imports: [SharedModule, CourseRoutingModule],
})
export class CourseModule {}
