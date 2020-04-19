import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, shareReplay, share, delay } from 'rxjs/operators';

import { Course, sortCoursesBySeqNo } from '../model/course';

@Injectable({ providedIn: 'root' })
export class CoursesService {

  constructor(private http: HttpClient) { }

  load(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/courses').pipe(
      map(res => res['payload'].sort(sortCoursesBySeqNo)),
      shareReplay()
    );
  }

  save(courseId: string, changes: Partial<Course>): Observable<any> {
    return this.http.put(`/api/courses/${courseId}`, changes).pipe(
      shareReplay()
    );
  }
}
