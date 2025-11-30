import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { formApi } from '../services/api';
import FormField from '../components/FormField';

const DynamicForm: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<any>({});
  const [validationErrors, setValidationErrors] = useState<any>({});

  const { data: schema, isLoading, error } = useQuery({
    queryKey: ['formSchema'],
    queryFn: formApi.getSchema,
  });

  const submitMutation = useMutation({
    mutationFn: formApi.submitForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      setFormData({});
      setValidationErrors({});
      alert('Form submitted successfully!');
      navigate('/submissions');
    },
    onError: (error: any) => {
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      } else {
        alert('Failed to submit form. Please try again.');
      }
    },
  });

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [fieldId]: value }));
    if (validationErrors[fieldId]) {
      setValidationErrors((prev: any) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-semibold text-lg mb-2">Error Loading Form</h2>
          <p className="text-red-600">Failed to load the form. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{schema?.title}</h1>
            <p className="text-gray-600 mt-2">{schema?.description}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {schema?.fields.map((field) => (
              <FormField
                key={field.id}
                field={field}
                value={formData[field.id]}
                onChange={(value) => handleFieldChange(field.id, value)}
                error={validationErrors[field.id]}
              />
            ))}

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                disabled={submitMutation.isPending}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {submitMutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </span>
                ) : (
                  'Submit'
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/submissions')}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
              >
                View Submissions
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;