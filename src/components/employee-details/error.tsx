import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";

interface EmployeeDetailErrorProps {
  refetch: () => void;
  isLoading: boolean;
}

export function EmployeeDetailError({ refetch, isLoading }: EmployeeDetailErrorProps) {
  return (
    <div className="p-4">
      <Alert variant="destructive">
        <AlertDescription className="flex justify-between items-center">
          Failed to load employee details{" "}
          <Button onClick={() => refetch()} variant="destructive" size="xs" disabled={isLoading}>
            {isLoading ? "Loading..." : "Retry"}
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
