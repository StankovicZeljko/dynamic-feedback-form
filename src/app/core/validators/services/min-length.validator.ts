import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class MinLengthValidator {
  create(minLength: number): ValidatorFn {
    return Validators.minLength(minLength);
  }
} 