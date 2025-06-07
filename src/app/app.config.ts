import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tenantInterceptor } from './core/interceptors/tenant.interceptor';
import { formReducer } from './store/form/form.reducer';
import { FormEffects } from './store/form/form.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(ReactiveFormsModule),
    provideStore({form: formReducer}),
    provideEffects([FormEffects]),
    provideHttpClient(withInterceptors([tenantInterceptor])),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
};
