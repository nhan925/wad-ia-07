import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Calendar, UserCircle, Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface UserProfileCardProps {
  user: User | null;
  onNameUpdated?: () => void;
}

export function UserProfileCard({ user, onNameUpdated }: UserProfileCardProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const queryClient = useQueryClient();

  const updateNameMutation = useMutation({
    mutationFn: (name: string) => api.updateName(name),
    onSuccess: (data) => {
      // Update the user cache with the new data
      queryClient.setQueryData(['user'], data);
      toast.success('Name updated successfully!');
      setIsEditingName(false);
      setNewName('');
      if (onNameUpdated) {
        onNameUpdated();
      }
    },
    onError: (error: any) => {
      toast.error('Failed to update name', {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  const handleStartEdit = () => {
    setNewName(user?.name || '');
    setIsEditingName(true);
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setNewName('');
  };

  const handleSave = async () => {
    if (!newName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    updateNameMutation.mutate(newName);
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          User Profile
        </CardTitle>
        <CardDescription>
          Your account information and details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <UserCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
            {!isEditingName ? (
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {user?.name}
                </p>
                <button
                  onClick={handleStartEdit}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                  title="Edit name"
                >
                  <Edit2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-1">
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="h-8"
                  disabled={updateNameMutation.isPending}
                  autoFocus
                />
                <button
                  onClick={handleSave}
                  disabled={updateNameMutation.isPending}
                  className="p-1 hover:bg-green-100 dark:hover:bg-green-900 rounded transition-colors"
                  title="Save"
                >
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={updateNameMutation.isPending}
                  className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                  title="Cancel"
                >
                  <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">User ID</p>
            <p className="font-mono text-sm text-gray-900 dark:text-white">
              {user?.id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Member Since
            </p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {user?.createdAt && formatDate(user.createdAt)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
