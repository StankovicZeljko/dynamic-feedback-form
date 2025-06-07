import { createAction, props } from '@ngrx/store';
import { FormConfig } from '../../core/models/form-config';

export const loadFormConfig = createAction(
  '[Form] Load Config',
  props<{ formId: string }>()
);

export const loadFormConfigSuccess = createAction(
  '[Form] Load Config Success',
  props<{ config: FormConfig }>()
);

export const loadFormConfigFailure = createAction(
  '[Form] Load Config Failure',
  props<{ error: string }>()
);

export const updateFormData = createAction(
  '[Form] Update Data',
  props<{ data: { [key: string]: any } }>()
);