import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ICourse, IPagination } from '@vrsoftware/entities';
import { catchError, Observable, throwError } from 'rxjs';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'vrsoftware-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  pageSizeOptions = [5, 10, 25, 50];
  paginatedCourses$: Observable<IPagination<ICourse>>;
  requestError: any;

  constructor(
    private readonly courseService: CourseService,
    private locationService: Location
  ) {}

  ngOnInit(): void {
    this.#loadCourses();
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
  }

  goBack(): void {
    this.locationService.back();
  }

  #loadCourses() {
    this.paginatedCourses$ = this.courseService.get().pipe(
      catchError((error) => {
        this.requestError = error;
        return throwError(() => error);
      })
    );
  }
}
