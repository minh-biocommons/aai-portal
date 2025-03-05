import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { AuthService as Auth0Service, User } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth0 = inject(Auth0Service);
  private document = inject(DOCUMENT);

  isAuthenticated = signal<boolean>(false);
  user = signal<User | null>(null);

  constructor() {
    // Subscribe to Auth0 authentication state
    this.auth0.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated.set(isAuthenticated);
    });

    // Subscribe to user details
    this.auth0.user$.subscribe((user) => {
      this.user.set(user || null);
    });
  }

  login(): void {
    this.auth0.loginWithRedirect();
  }

  logout(): void {
    this.auth0.logout({
      logoutParams: {
        returnTo: this.document.location.origin,
      },
    });
  }

  getUser(): User | null {
    return this.user();
  }
}
