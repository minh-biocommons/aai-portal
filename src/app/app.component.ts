import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginButtonComponent } from './shared/components/buttons/login-button/login-button.component';
import { LogoutButtonComponent } from './shared/components/buttons/logout-button/logout-button.component';
import { AuthService } from '@auth0/auth0-angular';
import { NavbarComponent } from './layouts/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LoginButtonComponent,
    LogoutButtonComponent,
    NavbarComponent,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  auth = inject(AuthService);
  title = 'aai-portal';
  isLoggedIn = false;

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      console.log('Is logged in:', isLoggedIn);
    });

    this.auth.user$.subscribe((user) => console.log('User:', user));
  }
}
