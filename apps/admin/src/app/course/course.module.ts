import { NgModule } from '@angular/core';
import { AngularSharedModule } from '@vrsoftware/angular-shared-module';
import { SaveCourseDialogComponent } from './components/save-course-dialog/save-course-dialog.component';
import { CourseRoutingModule } from './course-routing.module';

@NgModule({
  declarations: [CourseRoutingModule.pages, SaveCourseDialogComponent],
  imports: [AngularSharedModule, CourseRoutingModule],
})
export class CourseModule {}
