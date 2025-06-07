import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormConfig } from '../core/models/form-config';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  @Input() config!: FormConfig;
  @Input() form!: FormGroup;
  @Output() formSubmit = new EventEmitter<{ [key: string]: any }>();

  submit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }
}