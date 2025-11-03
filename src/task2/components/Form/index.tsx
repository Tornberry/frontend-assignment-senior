import styled from "@emotion/styled";
import React, { FC, FormEvent, useState } from "react";
import { useTheme } from "../../context/theme-context";
import Input from "../Input";
import Button from "../Button";

const StyledForm = styled.form<{ $cardBackground: string }>`
  background-color: ${props => props.$cardBackground};
  padding: 32px;
  border-radius: 12px;
  max-width: 500px;
  margin: 0 auto;
`;

const FormTitle = styled.h2<{ $textColor: string }>`
  margin: 0 0 24px 0;
  color: ${props => props.$textColor};
  font-size: 24px;
`;

const FormRow = styled.div`
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = {
  [K in keyof FormData]?: string;
};

const Form: FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      alert('Form submitted successfully!');
      console.log('Form data:', formData);
      // Reset form
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setErrors({});
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit} $cardBackground={theme.cardBackground}>
      <FormTitle $textColor={theme.textPrimary}>Sign Up Form</FormTitle>
      
      <FormRow>
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange('name')}
          error={errors.name}
          required
        />
      </FormRow>

      <FormRow>
        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange('email')}
          error={errors.email}
          helperText="We'll never share your email"
          required
        />
      </FormRow>

      <FormRow>
        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange('password')}
          error={errors.password}
          helperText="Must be at least 6 characters"
          required
        />
      </FormRow>

      <FormRow>
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={errors.confirmPassword}
          required
        />
      </FormRow>

      <ButtonGroup>
        <Button type="submit" variant="primary" size="medium">
          Submit
        </Button>
        <Button type="button" variant="secondary" size="medium" onClick={handleReset}>
          Reset
        </Button>
      </ButtonGroup>
    </StyledForm>
  );
};

export default Form;