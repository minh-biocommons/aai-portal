import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { AuthService as Auth0Service, User } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth0 = inject(Auth0Service);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<User | null>(null);
  public document = inject(DOCUMENT);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  user$ = this.userSubject.asObservable();

  constructor() {
    // Subscribe to Auth0 authentication state
    this.auth0.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticatedSubject.next(isAuthenticated);
    });

    // Subscribe to user details
    this.auth0.user$.subscribe((user) => {
      this.userSubject.next(user || null);
    });
  }

  login(): void {
    this.auth0.loginWithRedirect();
  }

  logout() {
    this.auth0.logout({
      logoutParams: {
        returnTo: this.document.location.origin,
      },
    });
  }

  getUser(): User | null {
    return this.userSubject.value;
  }
}
