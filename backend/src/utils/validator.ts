import type { FormField, FormSchema } from '../schema/formSchema.js';

export interface ValidationError {
  [field: string]: string;
}

export class FormValidator {
  private schema: FormSchema;

  constructor(schema: FormSchema) {
    this.schema = schema;
  }

  validate(data: any): { valid: boolean; errors: ValidationError } {
    const errors: ValidationError = {};

    for (const field of this.schema.fields) {
      const value = data[field.id];
      const fieldError = this.validateField(field, value);
      
      if (fieldError) {
        errors[field.id] = fieldError;
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  }

  private validateField(field: FormField, value: any): string | null {
    if (field.required && (value === undefined || value === null || value === '')) {
      return `${field.label} is required`;
    }

    if (!value && !field.required) {
      return null;
    }

    switch (field.type) {
      case 'text':
      case 'textarea':
        return this.validateText(field, value);
      case 'number':
        return this.validateNumber(field, value);
      case 'select':
        return this.validateSelect(field, value);
      case 'multi-select':
        return this.validateMultiSelect(field, value);
      case 'date':
        return this.validateDate(field, value);
      case 'switch':
        return this.validateSwitch(field, value);
      default:
        return null;
    }
  }

  private validateText(field: FormField, value: string): string | null {
    if (typeof value !== 'string') {
      return `${field.label} must be text`;
    }

    const validation = field.validation;
    if (!validation) return null;

    if (validation.minLength && value.length < validation.minLength) {
      return `${field.label} must be at least ${validation.minLength} characters`;
    }

    if (validation.maxLength && value.length > validation.maxLength) {
      return `${field.label} must be at most ${validation.maxLength} characters`;
    }

    if (validation.regex) {
      const regex = new RegExp(validation.regex);
      if (!regex.test(value)) {
        return `${field.label} format is invalid`;
      }
    }

    return null;
  }

  private validateNumber(field: FormField, value: any): string | null {
    const num = Number(value);
    
    if (isNaN(num)) {
      return `${field.label} must be a valid number`;
    }

    const validation = field.validation;
    if (!validation) return null;

    if (validation.min !== undefined && num < validation.min) {
      return `${field.label} must be at least ${validation.min}`;
    }

    if (validation.max !== undefined && num > validation.max) {
      return `${field.label} must be at most ${validation.max}`;
    }

    return null;
  }

  private validateSelect(field: FormField, value: string): string | null {
    if (!field.options) return null;

    const validValues = field.options.map(opt => opt.value);
    if (!validValues.includes(value)) {
      return `${field.label} must be one of the available options`;
    }

    return null;
  }

  private validateMultiSelect(field: FormField, value: any): string | null {
    if (!Array.isArray(value)) {
      return `${field.label} must be an array`;
    }

    if (field.options) {
      const validValues = field.options.map(opt => opt.value);
      for (const item of value) {
        if (!validValues.includes(item)) {
          return `${field.label} contains invalid options`;
        }
      }
    }

    const validation = field.validation;
    if (!validation) return null;

    if (validation.minSelected && value.length < validation.minSelected) {
      return `${field.label} must have at least ${validation.minSelected} selection(s)`;
    }

    if (validation.maxSelected && value.length > validation.maxSelected) {
      return `${field.label} must have at most ${validation.maxSelected} selection(s)`;
    }

    return null;
  }

  private validateDate(field: FormField, value: string): string | null {
    const date = new Date(value);
    
    if (isNaN(date.getTime())) {
      return `${field.label} must be a valid date`;
    }

    const validation = field.validation;
    if (!validation) return null;

    if (validation.minDate) {
      const minDate = new Date(validation.minDate);
      if (date < minDate) {
        return `${field.label} must be on or after ${validation.minDate}`;
      }
    }

    return null;
  }

  private validateSwitch(field: FormField, value: any): string | null {
    if (typeof value !== 'boolean') {
      return `${field.label} must be true or false`;
    }

    if (field.required && !value) {
      return `${field.label} must be accepted`;
    }

    return null;
  }
}
