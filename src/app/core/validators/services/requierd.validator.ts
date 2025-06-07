import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RequierdValidator  {
  create(): ValidatorFn {
    return Validators.required
  }
}
