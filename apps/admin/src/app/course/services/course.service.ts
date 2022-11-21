import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourse, IPagination } from '@vrsoftware/entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private readonly httpClient: HttpClient) {}

  get(
    pageNumber?: number,
    pageSize?: number
  ): Observable<IPagination<ICourse>> {
    const url =
      pageNumber && pageSize
        ? `/admin-api/course?page=${pageNumber}&limit=${pageSize}`
        : '/admin-api/course';

    return this.httpClient.get<IPagination<ICourse>>(url);
  }

  post(course: ICourse): Observable<ICourse> {
    return this.httpClient.post<ICourse>('/admin-api/course', course);
  }

  put(course: ICourse) {
    const url = `/admin-api/course/${course.id}`;

    return this.httpClient.put<ICourse>(url, course);
  }
}
