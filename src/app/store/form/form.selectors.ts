import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormState } from './form.state';

export const selectFormState = createFeatureSelector<FormState>('form');

export const selectFormConfig = createSelector(
  selectFormState,
  (state) => state.config
);

export const selectFormData = createSelector(
  selectFormState,
  (state) => state.data
);

export const selectFormLoading = createSelector(
  selectFormState,
  (state) => state.loading
);

export const selectFormError = createSelector(
  selectFormState,
  (state) => state.error
);