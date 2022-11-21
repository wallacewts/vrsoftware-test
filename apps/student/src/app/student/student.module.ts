import { NgModule } from '@angular/core';
import { StudentRoutingModule } from './student-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SaveStudentDialogComponent } from './components/save-student-dialog/save-student-dialog.component';

@NgModule({
  declarations: [StudentRoutingModule.pages, SaveStudentDialogComponent],
  imports: [SharedModule, StudentRoutingModule],
})
export class StudentModule {}
