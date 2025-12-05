import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-4",
};

export function Loader({ className, size = "md", fullScreen = false }: LoaderProps) {
  const spinner = (
    <div
      className={cn(
        "animate-spin rounded-full border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-100",
        sizeClasses[size],
        className
      )}
    />
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        {spinner}
      </div>
    );
  }

  return spinner;
}
