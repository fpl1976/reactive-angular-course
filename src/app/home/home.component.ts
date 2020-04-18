import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';

import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allCourses$: Observable<Course[]>;
  beginner$: Observable<Course[]>;
  advanced$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.allCourses$ = this.coursesService.load();
    this.beginner$ = this.allCourses$.pipe(
      map(courses => courses.filter(course => course.category === 'BEGINNER'))
    );
    this.advanced$ = this.allCourses$.pipe(
      map(courses => courses.filter(course => course.category === 'ADVANCED'))
    );
  }

  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
  }

}
