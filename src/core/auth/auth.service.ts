import { Injectable, computed, signal } from '@angular/core';
import { GoogleUser } from './models/google-user';

export interface AuthUser {
  email: string;
  name: string;
  picture?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'auth-token';
  private readonly USER_KEY = 'auth-user';

  constructor() {

    const user = sessionStorage.getItem(this.USER_KEY);

    if (user) {
      this.user.set(JSON.parse(user));
    }

  }

  readonly idToken = signal<string | null>(
    sessionStorage.getItem(this.TOKEN_KEY)
  );

  readonly user = signal<AuthUser | null>(null);

  readonly isAuthenticated = computed(() => this.idToken() !== null);

  login(user: GoogleUser): void {

    sessionStorage.setItem(this.TOKEN_KEY, user.accessToken);

    sessionStorage.setItem(this.USER_KEY, JSON.stringify({
      email: user.email,
      name: user.name,
      picture: user.picture
    }));

    this.idToken.set(user.accessToken);

    this.user.set({
      email: user.email,
      name: user.name,
      picture: user.picture
    });
  }

  logout(): void {

    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);

    this.idToken.set(null);
    this.user.set(null);

  }
}