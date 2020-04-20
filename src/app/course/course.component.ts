import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';

import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { CoursesService } from '../services/courses.service';

interface CourseData {
  course: Course;
  lessons: Lesson[];
}

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  data$: Observable<CourseData>;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService) { }

  ngOnInit() {
    const courseId = +this.route.snapshot.paramMap.get('courseId');
    const course$ = this.coursesService.getById(courseId);
    const lessons$ = this.coursesService.getLessonsByCourseId(courseId);

    this.data$ = combineLatest([
      course$, lessons$
    ]).pipe(
      map(([course, lessons]) => ({ course, lessons }))
    );
  }


}











