import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormConfig } from '../core/models/form-config';
import { FormFieldConfig } from '../core/models/form-field-config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnChanges {
  @Input() config!: FormConfig;
  @Input() formData: { [key: string]: any } | null = null;
  @Output() formChange = new EventEmitter<{ [key: string]: any }>();
  @Output() formSubmit = new EventEmitter<{ [key: string]: any }>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] && this.config) {
      this.buildForm();
    }
    if (changes['formData'] && this.form && this.formData) {
      this.form.patchValue(this.formData, { emitEvent: false });
    }
  }

  buildForm() {
    const group: { [key: string]: any } = {};
    for (const field of this.config.fields) {
      const validators = this.getValidators(field);
      group[field.id] = [this.formData ? this.formData[field.id] || '' : '', validators];
    }
    this.form = this.fb.group(group);

    this.form.valueChanges.subscribe(value => {
      this.formChange.emit(value);
    });
  }

  getValidators(field: FormFieldConfig) {
    const validators = [];
    if (field.required) {
      validators.push(Validators.required);
    }
    // Hier kannst du weitere Validierungen hinzufügen (z.B. minLength, maxLength, pattern)
    return validators;
  }

  submit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }
}