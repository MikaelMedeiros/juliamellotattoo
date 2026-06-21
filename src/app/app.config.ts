import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

const JuPreset = definePreset(Aura, {
  semantic: {
    primary: {
        50:  '{gray.50}',
        100: '{gray.100}',
        200: '{gray.200}',
        300: '{gray.300}',
        400: '{gray.400}',
        500: '{gray.500}',
        600: '{gray.600}',
        700: '{gray.700}',
        800: '{gray.800}',
        900: '{gray.900}',
        950: '{gray.950}'
    }
}
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled'
      })
    ),
    provideAnimationsAsync(),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: JuPreset,
        options: {
            cssLayer: {
                name: 'primeng',
                order: 'theme, base, primeng'
            }
        }
      } 
    })
  ]
};
