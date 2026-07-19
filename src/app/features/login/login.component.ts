import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { AuthService } from 'src/core/auth/auth.service';
import { GoogleOAuthProvider } from 'src/core/auth/providers/google/google-oauth.provider';

@Component({
  selector: 'app-login',
  imports: [ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private readonly googleOAuthProvider: GoogleOAuthProvider,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  async login(): Promise<void> {

    try {

      const code = await this.googleOAuthProvider.login();

      await this.authService.login(code);            

      const redirect =
        this.route.snapshot.queryParamMap.get('redirect');

      if (redirect) {
        await this.router.navigateByUrl(redirect);
      } else {
        await this.router.navigate(['/admin/main']);
      }

    } catch (error) {

      console.error(error);

    }

  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

}