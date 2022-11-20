import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
  declarations: [StudentRoutingModule.pages],
  imports: [CommonModule, StudentRoutingModule],
})
export class StudentModule {}
