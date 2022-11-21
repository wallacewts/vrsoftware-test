import { NgModule } from '@angular/core';
import { StudentRoutingModule } from './student-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [StudentRoutingModule.pages],
  imports: [SharedModule, StudentRoutingModule],
})
export class StudentModule {}
