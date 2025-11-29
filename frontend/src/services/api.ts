import axios, { type AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ success: boolean; error?: string; errors?: Record<string, string> }>) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface ValidationRule {
  minLength?: number;
  maxLength?: number;
  regex?: string;
  min?: number;
  max?: number;
  minDate?: string;
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

export interface Submission {
  id: string;
  data: Record<string, any>;
  createdAt: string;
}

export interface SubmissionsResponse {
  success: boolean;
  data: Submission[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SubmitFormResponse {
  success: boolean;
  id: string;
  createdAt: string;
  errors?: Record<string, string>;
}

export interface ApiError {
  success: false;
  error?: string;
  errors?: Record<string, string>;
}

export const formApi = {
  getSchema: async (): Promise<FormSchema> => {
    const response = await apiClient.get<FormSchema>('/form-schema');
    return response.data;
  },

  submitForm: async (data: Record<string, any>): Promise<SubmitFormResponse> => {
    const response = await apiClient.post<SubmitFormResponse>('/submissions', data);
    return response.data;
  },

  getSubmissions: async (
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc'
  ): Promise<SubmissionsResponse> => {
    const response = await apiClient.get<SubmissionsResponse>('/submissions', {
      params: { page, limit, sortBy, sortOrder },
    });
    return response.data;
  },

  getSubmissionById: async (id: string): Promise<{ success: boolean; data: Submission }> => {
    const response = await apiClient.get<{ success: boolean; data: Submission }>(`/submissions/${id}`);
    return response.data;
  },
};
