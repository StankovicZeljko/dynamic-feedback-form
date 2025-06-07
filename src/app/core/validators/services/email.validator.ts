import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmailValidator {
  create(): ValidatorFn {
    return Validators.email
  }
}
