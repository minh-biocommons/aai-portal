import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { AuthService as Auth0Service, User } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { concatMap, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth0 = inject(Auth0Service);
  private document = inject(DOCUMENT);
  private http = inject(HttpClient);

  isAuthenticated = signal<boolean>(false);
  user = signal<User | null>(null);
  userMetadata = signal<any>(null);

  constructor() {
    // Subscribe to Auth0 authentication state
    this.auth0.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated.set(isAuthenticated);
    });

    // Subscribe to user details
    this.fetchUserMetadata();
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

  private fetchUserMetadata(): void {
    this.auth0.user$
      .pipe(
        concatMap((user) =>
          this.http.get(
            encodeURI(`${environment.auth0.audience}users/${user?.sub}`),
          ),
        ),
        map((user: any) => user.user_metadata),
        tap((meta) => this.userMetadata.set(meta)),
      )
      .subscribe();
  }

  getUser(): User | null {
    return this.user();
  }

  getUserMetadata(): any {
    return this.userMetadata();
  }
}
