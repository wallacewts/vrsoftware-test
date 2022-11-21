import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseService } from '../../services/course.service';
import { ICourse } from '@vrsoftware/entities';
import { BehaviorSubject, catchError, finalize, Observable, tap } from 'rxjs';

class Course {
  id: string;
  name: string;
  syllabus: string;
}

@Component({
  selector: 'vrsoftware-save-course',
  templateUrl: './save-course-dialog.component.html',
  styleUrls: ['./save-course-dialog.component.scss'],
})
export class SaveCourseDialogComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;
  isLoadingSubject = new BehaviorSubject(false);
  requestError: any;
  request$: Observable<ICourse>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Course,
    private formBuild: FormBuilder,
    private courseService: CourseService
  ) {}

  get isLoading$() {
    return this.isLoadingSubject.asObservable();
  }

  get formControls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.#createForm(this.data || new Course());
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      const course = this.form.value as ICourse;
      const createOrUpdate = this.data
        ? this.courseService.put(course)
        : this.courseService.post(course);
      this.isLoadingSubject.next(true);
      this.request$ = createOrUpdate.pipe(
        tap({
          complete: () => {
            this.form.updateValueAndValidity();
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

  #createForm(course: Course) {
    this.form = this.formBuild.group({
      name: [
        course.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      syllabus: [course.syllabus, [Validators.required]],
    });
  }
}
