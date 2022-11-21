import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IStudent } from '@vrsoftware/entities';
import { catchError, Observable, throwError } from 'rxjs';
import { SaveStudentDialogComponent } from '../../components/save-student-dialog/save-student-dialog.component';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'vrsoftware-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  students$: Observable<IStudent[]>;
  requestError: any;

  constructor(
    private locationService: Location,
    private dialog: MatDialog,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.#loadStudents();
  }

  goBack() {
    this.locationService.back();
  }

  openDialog(student?: IStudent): void {
    const dialog = this.dialog.open(SaveStudentDialogComponent, {
      data: student,
    });
    dialog.afterClosed().subscribe((saved) => {
      this.#loadStudents();
    });
  }

  #loadStudents() {
    this.students$ = this.studentService.get().pipe(
      catchError((error) => {
        this.requestError = error;
        return throwError(() => error);
      })
    );
  }
}
