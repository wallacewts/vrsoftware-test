import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourse, IPagination } from '@vrsoftware/entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private readonly httpClient: HttpClient) {}

  get(): Observable<IPagination<ICourse>> {
    return this.httpClient.get<IPagination<ICourse>>('/admin-api/course');
  }
}
