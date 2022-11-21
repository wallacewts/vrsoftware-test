import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStudent } from '@vrsoftware/entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private readonly httpClient: HttpClient) {}

  get(): Observable<IStudent[]> {
    return this.httpClient.get<IStudent[]>('/admin-api/student');
  }

  post(student: IStudent): Observable<IStudent> {
    return this.httpClient.post<IStudent>('/admin-api/student', student);
  }

  put(student: IStudent) {
    const url = `/admin-api/student/${student.id}`;

    return this.httpClient.put<IStudent>(url, student);
  }
}
