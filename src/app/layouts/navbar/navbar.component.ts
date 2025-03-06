import {
  Component,
  inject,
  effect,
  Renderer2,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { LoginButtonComponent } from '../../shared/components/buttons/login-button/login-button.component';
import { LogoutButtonComponent } from '../../shared/components/buttons/logout-button/logout-button.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    LoginButtonComponent,
    LogoutButtonComponent,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  private auth = inject(AuthService);
  private renderer = inject(Renderer2);
  private router = inject(Router);

  @ViewChild('menu', { read: ElementRef }) menu!: ElementRef;
  @ViewChild('userMenuButton', { read: ElementRef })
  userMenuButton!: ElementRef;

  isAuthenticated = this.auth.isAuthenticated();
  user = this.auth.getUser();
  userPicture = this.user?.picture || '';
  userMenuOpen = false;

  constructor() {
    effect(() => {
      this.isAuthenticated = this.auth.isAuthenticated();
      this.user = this.auth.getUser();
      this.userPicture = this.user?.picture || '';
    });

    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        !this.userMenuButton?.nativeElement.contains(e.target) &&
        !this.menu?.nativeElement.contains(e.target)
      ) {
        this.userMenuOpen = false;
      }
    });
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  isActive(url: string): boolean {
    return this.router.url === url;
  }
}
