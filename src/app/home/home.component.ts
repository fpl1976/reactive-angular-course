import { Component, OnInit } from '@angular/core';

import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';

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
    private coursesService: CoursesService) { }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses(): void {
    this.allCourses$ = this.coursesService.load();
    this.beginner$ = this.allCourses$.pipe(
      map(courses => courses.filter(course => course.category === 'BEGINNER'))
    );
    this.advanced$ = this.allCourses$.pipe(
      map(courses => courses.filter(course => course.category === 'ADVANCED'))
    );
  }
}
