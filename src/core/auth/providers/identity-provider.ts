import { AuthSession } from '../auth.types';

export interface IdentityProvider {

  login(): Promise<AuthSession>;

  logout(): Promise<void>;

}