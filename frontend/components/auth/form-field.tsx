import { UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ReactNode } from 'react';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  validation?: RegisterOptions;
  helperText?: ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelExtra?: ReactNode;
}

export function FormField({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  register,
  errors,
  validation,
  helperText,
  onChange,
  labelExtra,
}: FormFieldProps) {
  const error = errors[name];
  const { onChange: registerOnChange, ...registerProps } = register(name, validation);

  const handleChange = onChange
    ? (e: React.ChangeEvent<HTMLInputElement>) => {
        registerOnChange(e);
        onChange(e);
      }
    : registerOnChange;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={id}>{label}</Label>
        {labelExtra}
      </div>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...registerProps}
        onChange={handleChange}
        aria-invalid={error ? 'true' : 'false'}
      />
      {helperText}
      {error && (
        <p className="text-sm font-medium text-destructive">
          {error.message as string}
        </p>
      )}
    </div>
  );
}

// Predefined validations
export const validations = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please provide a valid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters long',
    },
    validate: {
      hasUpperCase: (value: string) =>
        /[A-Z]/.test(value) || 'Password must contain at least 1 uppercase letter',
      hasLowerCase: (value: string) =>
        /[a-z]/.test(value) || 'Password must contain at least 1 lowercase letter',
      hasNumber: (value: string) =>
        /\d/.test(value) || 'Password must contain at least 1 number',
      hasSpecialChar: (value: string) =>
        /[@$!%*?&]/.test(value) || 'Password must contain at least 1 special character (@$!%*?&)',
    },
  },
  name: {
    required: 'Name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters long',
    },
  },
  confirmPassword: (getValues: (name: string) => any) => ({
    required: 'Please confirm your password',
    validate: (value: string) =>
      value === getValues('password') || 'Passwords do not match',
  }),
};
