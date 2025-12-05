'use client';

import { useAuth } from '@/lib/auth-context';
import ProtectedRoute from '@/components/protected-route';
import { DashboardHeader, UserProfileCard, FeaturesCard } from '@/components/dashboard';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed', {
        description: 'An error occurred while logging out',
      });
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <DashboardHeader onLogout={handleLogout} />
            <UserProfileCard user={user} />
            <FeaturesCard />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
