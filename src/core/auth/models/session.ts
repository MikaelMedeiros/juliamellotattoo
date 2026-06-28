import { Account } from './account';
import { ApplicationUser } from './application-user';

export interface Session {

  idToken: string;

  account: Account;

  user: ApplicationUser;

}