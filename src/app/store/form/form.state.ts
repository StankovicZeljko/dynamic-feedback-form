import { FormConfig } from '../../core/models/form-config';

export interface FormState {
  config: FormConfig | null;
  data: { [key: string]: any };
  loading: boolean;
  error: string | null;
}

export const initialFormState: FormState = {
  config: null,
  data: {},
  loading: false,
  error: null
};