import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-logout-button',
  imports: [],
  standalone: true,
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.css',
})
export class LogoutButtonComponent {
  public document = inject(DOCUMENT);
  private auth = inject(AuthService);

  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: this.document.location.origin,
      },
    });
  }
}
