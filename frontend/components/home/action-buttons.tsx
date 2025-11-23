import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Link href="/signup" className="sm:flex-1">
        <Button className="w-full cursor-pointer" size="lg">
          Sign Up
        </Button>
      </Link>
      <Link href="/login" className="sm:flex-1">
        <Button variant="outline" className="w-full cursor-pointer" size="lg">
          Log In
        </Button>
      </Link>
    </div>
  );
}
