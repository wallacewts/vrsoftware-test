import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IStudent } from '@vrsoftware/entities';
import { lastValueFrom, Observable } from 'rxjs';
import { SaveStudentDialogComponent } from '../../components/save-student-dialog/save-student-dialog.component';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'vrsoftware-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  student$: Observable<IStudent>;

  constructor(
    private locationService: Location,
    private dialog: MatDialog,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.#loadStudent();
  }

  goBack() {
    this.locationService.back();
  }

  async openDialog(): Promise<void> {
    const student = await lastValueFrom(this.student$);
    const dialog = this.dialog.open(SaveStudentDialogComponent, {
      data: student,
    });
    dialog.afterClosed().subscribe(async (name) => {
      if (name) {
        const updatedStudent = await lastValueFrom(
          this.studentService.getByName(name)
        );
        this.studentService.authenticate(updatedStudent);
        this.#loadStudent();
      }
    });
  }

  #loadStudent() {
    this.student$ = this.studentService.student$;
  }
}
