import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { provideToastr } from 'ngx-toastr';

import { provideTranslateService, TranslateService } from "@ngx-translate/core";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";
import { setHeaderInterceptor } from './core/interceptors/setHeader/set-header-interceptor';
import { errorInterceptor } from './core/interceptors/error/error-interceptor';
import { spinnerInterceptor } from './core/interceptors/spinner/spinner-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([setHeaderInterceptor, errorInterceptor, spinnerInterceptor]))//--> feature fetch افضل ك Preformance
    , provideToastr(),

    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      })
    }),

  ]
};
