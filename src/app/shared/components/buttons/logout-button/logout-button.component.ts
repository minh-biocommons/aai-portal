import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-logout-button',
  imports: [],
  standalone: true,
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.css',
})
export class LogoutButtonComponent {
  private auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }
}
