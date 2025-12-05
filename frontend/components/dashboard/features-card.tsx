import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'Access Token Management',
    description: 'Short-lived access tokens stored in memory for enhanced security',
  },
  {
    title: 'Refresh Token via HttpOnly Cookies',
    description: 'Secure refresh tokens stored in HttpOnly cookies to prevent XSS attacks',
  },
  {
    title: 'Automatic Token Refresh',
    description: 'Axios interceptors automatically refresh expired access tokens',
  },
  {
    title: 'Protected Routes',
    description: 'Route guards ensure only authenticated users can access protected pages',
  },
  {
    title: 'React Query Integration',
    description: 'Efficient state management for authentication and data fetching',
  },
];

export function FeaturesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Authentication Features</CardTitle>
        <CardDescription>
          This application implements secure JWT authentication
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {feature.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
