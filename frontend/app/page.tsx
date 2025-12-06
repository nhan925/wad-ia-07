import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroSection, ActionButtons, FeaturesGrid, TechStack, FooterInfo } from "@/components/home";
import PublicRoute from "@/components/public-route";

export default function Home() {
  return (
    <PublicRoute>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="w-full max-w-4xl space-y-8">
          <HeroSection />

          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">Get Started</CardTitle>
              <CardDescription>
                Create an account or log in to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ActionButtons />
              <FeaturesGrid />
              <TechStack />
            </CardContent>
          </Card>

          <FooterInfo />
        </div>
      </div>
    </PublicRoute>
  );
}
