import { ValidatorConfig } from './validator-config';
import { SelectOption } from './select-option';


export interface FormFieldConfig {
    id: string;
    type: 'text' | 'email' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'number';
    label: string;
    placeholder?: string;
    required?: boolean;
    validators?: ValidatorConfig[];
    options?: SelectOption[]; // für select/radio
    dependsOn?: string; // für abhängige Felder
    showWhen?: { fieldId: string; value: any | any[] };
    cssClass?: string;
}
