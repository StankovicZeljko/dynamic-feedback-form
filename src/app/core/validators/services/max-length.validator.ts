import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MaxLengthValidator {
  create(maxLength: number): ValidatorFn {
    return Validators.maxLength(maxLength);
  }
}
