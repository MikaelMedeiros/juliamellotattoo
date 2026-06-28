export interface AuthUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

export interface AuthSession {
  user: AuthUser;
  idToken: string;
}