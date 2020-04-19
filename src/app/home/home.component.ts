import { Component, OnInit } from '@angular/core';

import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';

import { Course } from '../model/course';
import { CourseStore } from '../services/course.store';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginner$: Observable<Course[]>;
  advanced$: Observable<Course[]>;

  constructor(
    private courseStore: CourseStore) { }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses(): void {
    this.beginner$ = this.courseStore.filter('BEGINNER');
    this.advanced$ = this.courseStore.filter('ADVANCED');
  }
}
