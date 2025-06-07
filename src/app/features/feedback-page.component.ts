import { Component, OnInit, inject, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormConfig,} from '../core/models/form-config';
import { FormFieldConfig } from '../core/models/form-field-config';
import { selectFormConfig, selectFormData, selectFormLoading, selectFormError } from '../store/form/form.selectors';
import { loadFormConfig, updateFormData } from '../store/form/form.actions';
import { DynamicFormComponent } from '../shared/dynamic-form.component';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {VALIDATORS} from '../core/validators/tokens/validator.token';

@Component({
  selector: 'app-feedback-page',
  standalone: true,
  imports: [
    DynamicFormComponent,
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.scss']
})
export class FeedbackPageComponent implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  formConfig$: Observable<FormConfig | null> = this.store.select(selectFormConfig);
  formData$: Observable<{ [key: string]: any }> = this.store.select(selectFormData);
  loading$: Observable<boolean> = this.store.select(selectFormLoading);
  error$: Observable<string | null> = this.store.select(selectFormError);

  form!: FormGroup;

  constructor(
    @Inject(VALIDATORS) private validators: { [key: string]: any }
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadFormConfig({ formId: 'feedback' }));

    // Subscribe auf FormConfig und baue das Formular, wenn die Config geladen ist
    this.formConfig$.subscribe(config => {
      if (config) {
        this.form = this.buildForm(config);
        
        // Subscribe auf FormData und aktualisiere das Formular, wenn sich die Daten ändern
        this.formData$.subscribe(data => {
          if (data && this.form) {
            this.form.patchValue(data, { emitEvent: false });
          }
        });

        // Subscribe auf Formular-Änderungen und dispatche updateFormData
        this.form.valueChanges.subscribe(value => {
          this.onFormChange(value);
        });
      }
    });
  }

  buildForm(config: FormConfig): FormGroup {
    const group: { [key: string]: any } = {};
    
    for (const field of config.fields) {
      const validators = this.getValidators(field);
      const initialValue = ''; // Hier könntest du auch aus formData$ den Wert nehmen
      group[field.id] = [initialValue, validators];
    }
    
    return this.fb.group(group);
  }

  getValidators(field: FormFieldConfig) {
    const validators = [];

    if (field.required) {
      validators.push(this.validators['required']()); // Verwende das Lookup-Objekt
    }

    if (field.validators) {
      for (const validatorConfig of field.validators) {
        const validatorFn = this.validators[validatorConfig.type];
        if (validatorFn) {
          // Korrigierte Logik: Übergib nur den Wert, nicht 'this'
          validators.push(validatorFn(validatorConfig.value));
        } else {
          console.warn(`Unknown validator type: ${validatorConfig.type}`);
        }
      }
    }

    return validators;
  }

  onFormChange(data: { [key: string]: any }) {
    this.store.dispatch(updateFormData({ data }));
  }

  onFormSubmit(data: { [key: string]: any }) {
    console.log('Form submitted:', data);
    // Hier könntest du z.B. eine Submit-Action dispatchen
    // this.store.dispatch(submitForm({ data }));
  }
}