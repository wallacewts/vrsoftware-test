import { NgModule } from '@angular/core';
import { StudentRoutingModule } from './student-routing.module';
import { SaveStudentDialogComponent } from './components/save-student-dialog/save-student-dialog.component';
import { AngularSharedModule } from '@vrsoftware/angular-shared-module';

@NgModule({
  declarations: [StudentRoutingModule.pages, SaveStudentDialogComponent],
  imports: [AngularSharedModule, StudentRoutingModule],
})
export class StudentModule {}
