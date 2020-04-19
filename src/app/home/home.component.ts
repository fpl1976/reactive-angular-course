import { Component, OnInit } from '@angular/core';

import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';

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
    private loadingService: LoadingService,
    private messagesService: MessagesService) { }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses(): void {
    this.allCourses$ = this.coursesService.load().pipe(
      catchError(err => {
        const message = 'Could not load services';
        this.messagesService.showErrors(message);
        console.error(message, err);
        return throwError(err);
      })
    );
    const loadCourses$ = this.loadingService.showLoaderUntilCompleted(this.allCourses$);

    this.beginner$ = loadCourses$.pipe(
      map(courses => courses.filter(course => course.category === 'BEGINNER'))
    );
    this.advanced$ = loadCourses$.pipe(
      map(courses => courses.filter(course => course.category === 'ADVANCED'))
    );

  }
}
