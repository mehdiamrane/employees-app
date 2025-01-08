import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorProps {
  refetch: () => void;
}

export function EmployeeTableError({ refetch }: ErrorProps) {
  return (
    <Alert variant="destructive" className="max-w-lg mx-auto">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex items-center justify-between gap-3">
        <p>Failed to load employees. Please try again.</p>
        <Button variant="destructive" size="xs" onClick={() => refetch()}>
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  );
}
