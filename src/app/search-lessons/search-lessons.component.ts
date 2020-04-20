import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay
} from 'rxjs/operators';
import { merge, fromEvent, Observable, concat } from 'rxjs';

import { Lesson } from '../model/lesson';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';


@Component({
  selector: 'course',
  templateUrl: './search-lessons.component.html',
  styleUrls: ['./search-lessons.component.css']
})
export class SearchLessonsComponent implements OnInit {

  searchLessons$: Observable<Lesson[]>;
  activeLesson: Lesson;

  constructor(private coursesService: CoursesService) { }

  ngOnInit() { }

  onSearch(search: string): void {
    this.searchLessons$ = this.coursesService.searchLessons(search);
  }

  openLesson(lesson: Lesson): void {
    this.activeLesson = lesson;
  }

  backToSearch(): void {
    this.activeLesson = null;
  }

}











