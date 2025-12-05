import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Calendar, UserCircle } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface UserProfileCardProps {
  user: User | null;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
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
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {user?.name}
            </p>
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
