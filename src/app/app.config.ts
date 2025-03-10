import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authHttpInterceptorFn } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAuth0({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: environment.auth0.redirectUri,
        audience: environment.auth0.audience,
        scope: environment.auth0.scope,
      },
      cacheLocation: 'localstorage',

      // Specify configuration for the interceptor
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://dev-bc.au.auth0.com/api/v2/' (note the asterisk)
            uri: `${environment.auth0.audience}*`,
            tokenOptions: {
              authorizationParams: {
                // The attached token should target this audience
                audience: environment.auth0.audience,

                // The attached token should have these scopes
                scope: environment.auth0.scope,
              },
            },
          },
        ],
      },
    }),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
