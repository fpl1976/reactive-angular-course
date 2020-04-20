import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { User } from '../model/user';

const AUTH_KEY = 'auth::courses';

@Injectable({ providedIn: 'root' })
export class AuthStore {

  private subject = new BehaviorSubject<User>(null);

  user$: Observable<User> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
    this.tryRestoreSession();
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/login', { email, password }).pipe(
      tap(user => {
        this.subject.next(user);
        window.localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      }),
      shareReplay()
    );
  }

  logout(): void {
    this.subject.next(null);
    window.localStorage.removeItem(AUTH_KEY);
  }

  private tryRestoreSession(): void {
    const user = window.localStorage.getItem(AUTH_KEY);
    if (user) {
      this.subject.next(JSON.parse(user));
    }
  }

}
