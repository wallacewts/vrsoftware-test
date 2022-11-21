import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IStudent } from '@vrsoftware/entities';
import { BehaviorSubject, catchError, finalize, Observable, tap } from 'rxjs';
import { StudentService } from '../../services/student.service';

class Course {
  id: string;
  name: string;
  syllabus: string;
}

class Student {
  id: string;
  name: string;
  courses: Course[];
}

@Component({
  selector: 'vrsoftware-save-student',
  templateUrl: './save-student-dialog.component.html',
  styleUrls: ['./save-student-dialog.component.scss'],
})
export class SaveStudentDialogComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;
  isLoadingSubject = new BehaviorSubject(false);
  requestError: any;
  request$: Observable<IStudent>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Student,
    private formBuild: FormBuilder,
    private studentService: StudentService,
    private dialogRef: MatDialogRef<SaveStudentDialogComponent>
  ) {}

  get isLoading$() {
    return this.isLoadingSubject.asObservable();
  }

  get formControls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.#createForm(this.data || new Student());
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      const student = this.form.value as IStudent;
      const createOrUpdate = this.data
        ? this.studentService.put({
            ...this.data,
            ...student,
          })
        : this.studentService.post(student);
      this.isLoadingSubject.next(true);
      this.request$ = createOrUpdate.pipe(
        tap({
          complete: () => {
            if (this.data) {
              this.dialogRef.close(true);
            } else {
              this.form.updateValueAndValidity();
            }
          },
        }),
        catchError((error) => {
          this.requestError = error;
          throw error;
        }),
        finalize(() => {
          this.isLoadingSubject.next(false);
        })
      );
    }
  }

  #createForm(course: Student) {
    this.form = this.formBuild.group({
      name: [
        course.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });
  }
}
