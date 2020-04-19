import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import * as moment from 'moment';

import { Course } from '../model/course';

import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { MessagesService } from '../messages/messages.service';
import { CourseStore } from '../services/course.store';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
  providers: [MessagesService]
})
export class CourseDialogComponent implements AfterViewInit {

  form: FormGroup;
  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private store: CourseStore,
    @Inject(MAT_DIALOG_DATA) course: Course) {

    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required]
    });

  }

  ngAfterViewInit() {

  }

  save() {
    const changes = this.form.value;

    this.store.save(this.course.id, changes).pipe(
      take(1)
    ).subscribe();

    this.dialogRef.close(changes);
  }

  close() {
    this.dialogRef.close();
  }

}
