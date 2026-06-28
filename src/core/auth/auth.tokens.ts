import { InjectionToken } from '@angular/core';
import { IdentityProvider } from './providers/identity-provider';

export const IDENTITY_PROVIDER =
  new InjectionToken<IdentityProvider>('IDENTITY_PROVIDER');