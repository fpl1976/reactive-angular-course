import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { filter, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Course } from '../model/course';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnDestroy {

  @Input() courses: Course[];

  destroy$ = new Subject();

  constructor(
    private dialog: MatDialog) { }

  editCourse(course: Course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef.afterClosed().pipe(
      filter(Boolean),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
