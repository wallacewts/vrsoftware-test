import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ICourse, IPagination, IStudent } from '@vrsoftware/entities';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { CourseService } from '../../services/course.service';
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
  pageSizeOptions = [5, 10, 25, 50];
  paginatedCourses$: Observable<IPagination<ICourse>>;
  coursesRequestError: any;
  currentPageSize = 10;
  courses: ICourse[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Student,
    private formBuild: FormBuilder,
    private studentService: StudentService,
    private dialogRef: MatDialogRef<SaveStudentDialogComponent>,
    private readonly courseService: CourseService
  ) {}

  get isLoading$() {
    return this.isLoadingSubject.asObservable();
  }

  get formControls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.#createForm(this.data || new Student());
    this.#loadCourses(1, this.currentPageSize);
  }

  courseIdControlById(id: string) {
    const checkArray: FormArray = this.form.get('courseIds') as FormArray;

    return checkArray.controls.find((item) => item.value === id);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      const student = this.form.value;

      this.isLoadingSubject.next(true);
      this.request$ = this.studentService
        .put({
          ...this.data,
          ...student,
        })
        .pipe(
          tap({
            complete: () => {
              if (this.data) {
                this.dialogRef.close(student.name);
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

  handlePageEvent({ pageSize, pageIndex }: PageEvent) {
    this.currentPageSize = pageSize;
    const pageNumber = pageIndex + 1;

    this.#loadCourses(pageNumber, pageSize);
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.form.get('courseIds') as FormArray;
    if (e.checked) {
      checkArray.push(new FormControl(e.source.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item) => {
        if (item.value == e.source.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  #createForm(student: Student) {
    this.form = this.formBuild.group({
      name: [
        student.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      courseIds: this.formBuild.array(
        student?.courses ? student.courses.map((course) => course.id) : [],
        [Validators.required]
      ),
    });
  }

  #loadCourses(pageNumber?: number, pageSize?: number) {
    this.paginatedCourses$ = this.courseService.get(pageNumber, pageSize).pipe(
      catchError((error) => {
        this.coursesRequestError = error;
        return throwError(() => error);
      })
    );
  }
}
