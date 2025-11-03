import { createContext, useContext, useState, ReactNode } from 'react';
import { z, ZodError } from 'zod';

// Zod schemas for validation
export const step1Schema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .refine((val) => val.trim().length >= 2, {
      message: 'Name must be at least 2 characters',
    }),
  email: z.string()
    .min(1, 'Email is required')
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Invalid email address',
    }),
});

export const step2Schema = z.object({
  phone: z.string()
    .min(1, 'Phone is required')
    .refine((val) => val.trim().length >= 10, {
      message: 'Phone must be at least 10 characters',
    }),
  address: z.string()
    .min(1, 'Address is required')
    .refine((val) => val.trim().length >= 5, {
      message: 'Address must be at least 5 characters',
    }),
});

export const step3Schema = z.object({
  preferences: z.string().min(1, 'Please select a preference'),
  newsletter: z.boolean(),
});

export type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  preferences: string;
  newsletter: boolean;
};

type FormErrors = {
  [key: string]: string;
};

type FormContextType = {
  formData: FormData;
  errors: FormErrors;
  currentStep: number;
  isSubmitting: boolean;
  updateField: (field: keyof FormData, value: string | boolean) => void;
  validateStep: (step: number) => boolean;
  nextStep: () => void;
  prevStep: () => void;
  submitForm: () => Promise<void>;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    preferences: '',
    newsletter: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
  try {
    if (step === 1) {
      step1Schema.parse({ name: formData.name, email: formData.email });
    } else if (step === 2) {
      step2Schema.parse({ phone: formData.phone, address: formData.address });
    } else if (step === 3) {
      step3Schema.parse({
        preferences: formData.preferences,
        newsletter: formData.newsletter
      });
    }

    setErrors({});
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Use flatten() to get field errors
      const fieldErrors = error.flatten().fieldErrors;
      const newErrors: FormErrors = {};
      
      Object.entries(fieldErrors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          newErrors[field] = messages[0]; // Take first error message
        }
      });
      
      setErrors(newErrors);
    }
    return false;
  }
};

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  const submitForm = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');

    setIsSubmitting(false);

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      preferences: '',
      newsletter: false,
    });
    setCurrentStep(1);
    setErrors({});
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        errors,
        currentStep,
        isSubmitting,
        updateField,
        validateStep,
        nextStep,
        prevStep,
        submitForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within FormProvider');
  }
  return context;
};
