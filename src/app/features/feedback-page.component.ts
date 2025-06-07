import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormConfig } from '../core/models/form-config';
import { selectFormConfig, selectFormData, selectFormLoading, selectFormError } from '../store/form/form.selectors';
import { loadFormConfig, updateFormData } from '../store/form/form.actions';
import { DynamicFormComponent } from '../shared/dynamic-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-feedback-page',
  standalone: true,
  imports: [
    // Importiere die Dumb Component
    DynamicFormComponent,
    AsyncPipe
  ],
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.scss']
})
export class FeedbackPageComponent implements OnInit {
  private store = inject(Store);

  formConfig$: Observable<FormConfig | null> = this.store.select(selectFormConfig);
  formData$: Observable<{ [key: string]: any }> = this.store.select(selectFormData);
  loading$: Observable<boolean> = this.store.select(selectFormLoading);
  error$: Observable<string | null> = this.store.select(selectFormError);

  ngOnInit(): void {
    this.store.dispatch(loadFormConfig({ formId: 'feedback' }));
  }

  onFormChange(data: { [key: string]: any }) {
    this.store.dispatch(updateFormData({ data }));
  }

  onFormSubmit(data: { [key: string]: any }) {
    // Hier könntest du z.B. eine Submit-Action dispatchen oder einen Service aufrufen
    console.log('Form submitted:', data);
  }
}