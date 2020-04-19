import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class MessagesService {

  private errorsSubject = new BehaviorSubject<string[]>([]);
  errors$: Observable<string[]> = this.errorsSubject.asObservable().pipe(
    filter(messages => messages && messages.length > 0)
  );

  showErrors(...errors: string[]) {
    this.errorsSubject.next(errors);
  }
}
