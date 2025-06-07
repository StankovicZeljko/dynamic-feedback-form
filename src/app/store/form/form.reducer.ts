import { createReducer, on } from '@ngrx/store';
import * as FormActions from './form.actions';
import { FormState, initialFormState } from './form.state';

export const formReducer = createReducer(
  initialFormState,
  on(FormActions.loadFormConfig, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(FormActions.loadFormConfigSuccess, (state, { config }) => ({
    ...state,
    config,
    loading: false
  })),
  on(FormActions.loadFormConfigFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(FormActions.updateFormData, (state, { data }) => ({
    ...state,
    data: { ...state.data, ...data }
  }))
);