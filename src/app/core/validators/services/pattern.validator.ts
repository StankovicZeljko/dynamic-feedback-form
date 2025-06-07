import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PatternValidator {
  create(pattern: string): ValidatorFn {
    return Validators.pattern(pattern);
  }
} 
