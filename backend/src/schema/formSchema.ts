
export interface ValidationRule {
  minLength?: number;
  maxLength?: number;
  regex?: string;
  min?: number;
  max?: number;
  minDate?: string | undefined;
  minSelected?: number;
  maxSelected?: number;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormField {
  id: string;
  type: 'text' | 'number' | 'select' | 'multi-select' | 'date' | 'textarea' | 'switch';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[];
  validation?: ValidationRule;
}

export interface FormSchema {
  title: string;
  description: string;
  fields: FormField[];
}

export const employeeOnboardingSchema: FormSchema = {
  title: "Employee Onboarding",
  description: "Please fill out this form to complete your onboarding process",
  fields: [
    {
      id: "fullName",
      type: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
      validation: {
        minLength: 2,
        maxLength: 100
      }
    },
    {
      id: "email",
      type: "text",
      label: "Email Address",
      placeholder: "your.email@company.com",
      required: true,
      validation: {
        regex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
      }
    },
    {
      id: "age",
      type: "number",
      label: "Age",
      placeholder: "Enter your age",
      required: true,
      validation: {
        min: 18,
        max: 65
      }
    },
    {
      id: "department",
      type: "select",
      label: "Department",
      placeholder: "Select your department",
      required: true,
      options: [
        { value: "engineering", label: "Engineering" },
        { value: "marketing", label: "Marketing" },
        { value: "sales", label: "Sales" },
        { value: "hr", label: "Human Resources" },
        { value: "finance", label: "Finance" }
      ]
    },
    {
      id: "skills",
      type: "multi-select",
      label: "Skills",
      placeholder: "Select your skills",
      required: true,
      options: [
        { value: "javascript", label: "JavaScript" },
        { value: "typescript", label: "TypeScript" },
        { value: "react", label: "React" },
        { value: "nodejs", label: "Node.js" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
        { value: "communication", label: "Communication" },
        { value: "leadership", label: "Leadership" }
      ],
      validation: {
        minSelected: 1,
        maxSelected: 5
      }
    },
    {
      id: "startDate",
      type: "date",
      label: "Start Date",
      required: true,
      validation: {
        minDate: new Date().toISOString().split('T')[0]
      }
    },
    {
      id: "bio",
      type: "textarea",
      label: "Brief Bio",
      placeholder: "Tell us about yourself",
      required: false,
      validation: {
        maxLength: 500
      }
    },
    {
      id: "termsAccepted",
      type: "switch",
      label: "I accept the terms and conditions",
      required: true
    }
  ]
};
