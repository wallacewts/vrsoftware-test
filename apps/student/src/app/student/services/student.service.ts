import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStudent } from '@vrsoftware/entities';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  student$: Observable<IStudent>;

  constructor(private readonly httpClient: HttpClient) {}

  authenticate(student: IStudent) {
    localStorage.setItem('student', JSON.stringify(student));
    this.student$ = of(student);
  }

  getAuthenticatedUser(): string | null {
    const jsonStudent = localStorage.getItem('student');

    return jsonStudent;
  }

  getByName(name: string) {
    return this.httpClient.get<IStudent>('/student-api/student/' + name);
  }

  put(student: IStudent) {
    const url = `/student-api/student/${student.id}`;

    return this.httpClient.put<IStudent>(url, student);
  }
}
