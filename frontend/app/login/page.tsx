'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useAuth } from '@/lib/auth-context';
import PublicRoute from '@/components/public-route';
import {
  AuthLayout,
  FormField,
  validations,
  FormFooter,
} from '@/components/auth';

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const loggedInUser = await login(data.email, data.password);
      toast.success('Login successful!', {
        description: `Welcome back, ${loggedInUser.name}!`,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      toast.error('Login failed', {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PublicRoute>
    <AuthLayout
      title="Welcome back"
      description="Enter your credentials to access your account"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
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
            validation={{ required: 'Password is required' }}
          />
        </div>

        <FormFooter
          isLoading={isLoading}
          submitText="Log In"
          loadingText="Logging in..."
          redirectText="Don't have an account?"
          redirectLink="/signup"
          redirectLinkText="Sign up"
        />
      </form>
    </AuthLayout>
    </PublicRoute>
  );
}
