'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import {
  AuthLayout,
  FormField,
  validations,
  FormFooter,
  PasswordStrengthIndicator,
  calculatePasswordStrength,
  PasswordTooltip,
  type PasswordStrength,
} from '@/components/auth';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('weak');

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const registerMutation = useMutation({
    mutationFn: api.register,
    onSuccess: () => {
      toast.success('Registration successful!', {
        description: 'Redirecting to login page...',
      });
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      toast.error('Registration failed', {
        description: Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage,
      });
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your information to create your account"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            id="name"
            name="name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            register={register}
            errors={errors}
            validation={validations.name}
          />

          <FormField
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="your.email@example.com"
            register={register}
            errors={errors}
            validation={validations.email}
          />
          
          <FormField
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register}
            errors={errors}
            validation={validations.password}
            labelExtra={<PasswordTooltip />}
            onChange={(e) => setPasswordStrength(calculatePasswordStrength(e.target.value))}
            helperText={
              password && passwordStrength && (
                <PasswordStrengthIndicator strength={passwordStrength} />
              )
            }
          />
          
          <FormField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            register={register}
            errors={errors}
            validation={validations.confirmPassword(getValues)}
          />
        </div>

        <FormFooter
          isLoading={registerMutation.isPending}
          submitText="Sign Up"
          loadingText="Creating account..."
          redirectText="Already have an account?"
          redirectLink="/login"
          redirectLinkText="Log in"
        />
      </form>
    </AuthLayout>
  );
}
