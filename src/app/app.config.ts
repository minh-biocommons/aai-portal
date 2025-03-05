import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAuth0({
      domain: 'dev-bc.au.auth0.com',
      clientId: 'JRpeNw5QAvtO85smXAMMvHXMKSxJpLnQ',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
