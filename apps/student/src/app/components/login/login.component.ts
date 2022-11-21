import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IStudent } from '@vrsoftware/entities';
import { BehaviorSubject, catchError, finalize, Observable, tap } from 'rxjs';
import { StudentService } from '../../student/services/student.service';

class Student {
  name: string;
}

@Component({
  selector: 'vrsoftware-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;
  isLoadingSubject = new BehaviorSubject(false);
  requestError: any;
  request$: Observable<IStudent>;

  constructor(
    private formBuild: FormBuilder,
    private studentService: StudentService,
    private routerService: Router
  ) {}

  get isLoading$() {
    return this.isLoadingSubject.asObservable();
  }

  get formControls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.#createForm(new Student());
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      const student = this.form.value as IStudent;
      this.isLoadingSubject.next(true);
      this.request$ = this.studentService.getByName(student.name).pipe(
        tap({
          next: (response) => {
            this.studentService.authenticate(response);
            this.routerService.navigateByUrl('/aluno');
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

  #createForm(student: Student) {
    this.form = this.formBuild.group({
      name: [student.name, [Validators.required]],
    });
  }
}
