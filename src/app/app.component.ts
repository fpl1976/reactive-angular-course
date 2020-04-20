import { Component, OnInit } from '@angular/core';
import { AuthStore } from './services/auth.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loggedIn$: Observable<boolean>;
  loggedOut$: Observable<boolean>;

  constructor(
    private store: AuthStore) { }

  ngOnInit() {
    this.loggedIn$ = this.store.isLoggedIn$;
    this.loggedOut$ = this.store.isLoggedOut$;
  }

  logout() {
    this.store.logout();
  }

}
