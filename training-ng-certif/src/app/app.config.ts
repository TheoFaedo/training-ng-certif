import {
  ApplicationConfig,
  InjectionToken,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';

export interface ConfigBindings {
  baseUrl: string;
  timeout: number;
  feature: boolean;
}

export const APP_CONFIG = new InjectionToken<ApplicationConfig>('APP_CONFIG');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: APP_CONFIG,
      useValue: {
        baseUrl: '',
        timeout: 3000,
        feature: true,
      },
    },
  ],
};
