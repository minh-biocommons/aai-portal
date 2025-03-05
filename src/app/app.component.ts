import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginButtonComponent } from './shared/components/buttons/login-button/login-button.component';
import { LogoutButtonComponent } from './shared/components/buttons/logout-button/logout-button.component';
import { AuthService } from './core/services/auth.service';
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
  user!: any;

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(
      (isAuthenticated) => (this.isLoggedIn = isAuthenticated),
    );

    this.user = this.auth.getUser();
    console.log(this.user);
  }
}
