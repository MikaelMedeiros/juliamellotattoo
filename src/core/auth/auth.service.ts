import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from 'src/environments/environment';

export interface AuthUser {
  email: string;
  name: string;
  picture?: string;
}

interface LoginResponse {
  token: string;
  user: {
    email: string;
    name: string;
    picture?: string;
  };
  organization: {
    id: string;
    name: string;
    slug: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'access-token';
  private readonly USER_KEY = 'auth-user';

  constructor(
    private readonly http: HttpClient
  ) {

    const user = sessionStorage.getItem(this.USER_KEY);

    if (user) {
      this.user.set(JSON.parse(user));
    }

  }

  readonly token = signal<string | null>(
    sessionStorage.getItem(this.TOKEN_KEY)
  );

  readonly user = signal<AuthUser | null>(null);

  readonly isAuthenticated = computed(() => this.token() !== null);

  async login(code: string): Promise<void> {

    const response = await firstValueFrom(
      this.http.post<LoginResponse>(
        '/api/auth/google/login',
        { code }
      )
    );

    sessionStorage.setItem(this.TOKEN_KEY, response.token);

    sessionStorage.setItem(
      this.USER_KEY,
      JSON.stringify(response.user)
    );

    this.token.set(response.token);

    this.user.set(response.user);

  }

  logout(): void {

    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);

    this.token.set(null);
    this.user.set(null);

  }

}