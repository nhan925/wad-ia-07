'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, setAccessToken, getAccessToken } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/ui/loader';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch user profile (only if we have a token)
  const { data: user, isLoading, refetch } = useQuery<User>({
    queryKey: ['user'],
    queryFn: api.getProfile,
    enabled: false, // Don't run automatically
    retry: false,
    staleTime: Infinity,
  });

  // Try to refresh token on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Try to refresh token (will use HttpOnly cookie)
        await api.refreshToken();
        // If successful, fetch user profile
        await refetch();
      } catch (error) {
        // No valid refresh token, user is not authenticated
        setAccessToken(null);
        // This is fine, middleware handles redirects
      } finally {
        setIsInitialized(true);
      }
    };

    initAuth();
  }, [refetch]);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      api.login({ email, password }),
    onSuccess: async () => {
      // Fetch user profile after login
      await refetch();
      router.push('/dashboard');
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: api.logout,
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();
      router.push('/login');
    },
  });

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
    // Return the user data after refetch completes
    const result = await refetch();
    return result.data!;
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const refreshAuth = async () => {
    await refetch();
  };

  const isAuthenticated = !!user && !!getAccessToken();

  // Show loading state while checking authentication
  if (!isInitialized) {
    return <Loader fullScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading: !isInitialized || isLoading,
        isAuthenticated,
        login,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
