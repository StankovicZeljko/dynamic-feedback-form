import { InjectionToken, inject } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { 
  RequierdValidator, 
  MinLengthValidator,
  EmailValidator,
  MaxLengthValidator,
  PatternValidator,
} from '../services';

export const VALIDATORS = new InjectionToken<{[key: string]: any}>('VALIDATORS',
    {
    providedIn: 'root',
    factory: () => {
      const required = inject(RequierdValidator);
      const minLength = inject(MinLengthValidator);
      const email = inject(EmailValidator);
      const maxLength = inject(MaxLengthValidator);
      const pattern = inject(PatternValidator);

      return {
        required: (value: any) => required.create(),
        minLength: (value: number) => minLength.create(value),
        email: () => email.create(),
        maxLength: (value: number) => maxLength.create(value),
        pattern: (value: string) => pattern.create(value),
      };    
    }
  }
);