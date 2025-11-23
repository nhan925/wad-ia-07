const features = [
  {
    color: "bg-green-500",
    title: "Secure Password Hashing",
    description: "bcrypt encryption with 10 salt rounds"
  },
  {
    color: "bg-blue-500",
    title: "Strong Validation",
    description: "Client & server-side password requirements"
  },
  {
    color: "bg-purple-500",
    title: "Modern Tech Stack",
    description: "NestJS backend with Next.js 16 frontend"
  },
  {
    color: "bg-orange-500",
    title: "Real-time Feedback",
    description: "Toast notifications & form validation"
  }
];

export function FeaturesGrid() {
  return (
    <div className="pt-6 border-t">
      <h3 className="text-sm font-semibold text-center mb-4 text-muted-foreground">
        FEATURES
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature) => (
          <div key={feature.title} className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${feature.color}`} />
              <span className="text-sm font-medium">{feature.title}</span>
            </div>
            <p className="text-xs text-muted-foreground ml-4">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
