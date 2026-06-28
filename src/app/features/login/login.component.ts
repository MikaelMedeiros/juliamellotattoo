import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from 'src/core/auth/auth.service';
import { GoogleIdentityProvider } from 'src/core/auth/providers/google/google-identity.provider';

@Component({
  selector: 'app-login',
  imports: [ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
      private readonly googleIdentityProvider: GoogleIdentityProvider,
      private readonly router: Router,
      private readonly authService: AuthService
  ) {}

  async login(): Promise<void> {
  try {

      const user = await this.googleIdentityProvider.login();      

      this.authService.login(user);

      await this.router.navigate(['/admin/main']);

    } catch (error) {
      console.error('LOGIN ERROR', error);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
