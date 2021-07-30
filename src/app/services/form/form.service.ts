import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  isInvalid(control: FormControl): boolean | null {
    return control.invalid && control.dirty;
  }

  isValid(control: FormControl): boolean {
    return !control.invalid && control.dirty;
  }
}
