import { FormFieldConfig } from "./form-field-config";

export interface FormConfig {
    id: string;
    title: string;
    description?: string;
    fields: FormFieldConfig[];
    submitButtonText?: string;
}
