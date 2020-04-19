import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

import { CoursesService } from './courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';

import { Course, sortCoursesBySeqNo } from '../model/course';

@Injectable({ providedIn: 'root' })
export class CourseStore {

  private subject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.subject.asObservable();

  constructor(
    private coursesService: CoursesService,
    private loading: LoadingService,
    private messages: MessagesService) {
      this.loadCourses();
     }

  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
      map(courses => courses
        .filter(c => c.category === category)
        .sort(sortCoursesBySeqNo)
      )
    );
  }

  private async loadCourses() {
    const load$ = this.coursesService.load().pipe(
      map(courses => this.subject.next(courses)),
      catchError(err => {
        const message = 'Could not load courses';
        this.messages.showErrors(message);
        console.error(message, err);
        return throwError(err);
      })
    );

    await this.loading.showLoaderUntilCompleted(load$).pipe(take(1)).toPromise();
  }

}

