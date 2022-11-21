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
        ? `/student-api/course?page=${pageNumber}&limit=${pageSize}`
        : '/student-api/course';

    return this.httpClient.get<IPagination<ICourse>>(url);
  }
}
