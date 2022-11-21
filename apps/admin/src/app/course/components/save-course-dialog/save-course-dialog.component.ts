import { Component, Inject, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

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
  matcher = new CustomErrorStateMatcher();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Course,
    private formBuild: FormBuilder
  ) {}

  ngOnInit(): void {
    this.#createForm(this.data || new Course());
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      console.table(this.form.value);
    }
  }

  get formControls() {
    return this.form.controls;
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
