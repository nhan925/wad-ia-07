import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';

interface FormFooterProps {
  isLoading: boolean;
  submitText: string;
  loadingText: string;
  redirectText: string;
  redirectLink: string;
  redirectLinkText: string;
}

export function FormFooter({
  isLoading,
  submitText,
  loadingText,
  redirectText,
  redirectLink,
  redirectLinkText,
}: FormFooterProps) {
  return (
    <CardFooter className="flex flex-col gap-4 px-0">
      <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
        {isLoading ? loadingText : submitText}
      </Button>
      <p className="text-sm text-center text-muted-foreground">
        {redirectText}{' '}
        <Link href={redirectLink} className="text-primary hover:underline">
          {redirectLinkText}
        </Link>
      </p>
    </CardFooter>
  );
}
