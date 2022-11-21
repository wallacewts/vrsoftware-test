import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ICourse, IPagination } from '@vrsoftware/entities';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { SaveCourseDialogComponent } from '../../components/save-course-dialog/save-course-dialog.component';

@Component({
  selector: 'vrsoftware-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  pageSizeOptions = [5, 10, 25, 50];
  paginatedCourses$: Observable<IPagination<ICourse>>;
  requestError: any;
  currentPageSize: number;

  constructor(
    private readonly courseService: CourseService,
    private locationService: Location,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.#loadCourses();
  }

  handlePageEvent({ pageSize, pageIndex }: PageEvent) {
    this.currentPageSize = pageSize;
    const pageNumber = pageIndex + 1;

    this.#loadCourses(pageNumber, pageSize);
  }

  goBack(): void {
    this.locationService.back();
  }

  openDialog(): void {
    const dialog = this.dialog.open(SaveCourseDialogComponent);

    dialog.afterClosed().subscribe(() => {
      this.#loadCourses(0, this.currentPageSize);
    });
  }

  #loadCourses(pageNumber?: number, pageSize?: number) {
    this.paginatedCourses$ = this.courseService.get(pageNumber, pageSize).pipe(
      tap((data) => {
        data.meta.itemCount;
      }),
      catchError((error) => {
        this.requestError = error;
        return throwError(() => error);
      })
    );
  }
}
