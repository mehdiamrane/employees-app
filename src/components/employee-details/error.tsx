import { ArrowLeftIcon, RefreshCcwIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";

interface EmployeeDetailErrorProps {
  refetch: () => void;
  isLoading: boolean;
  errorStatus?: number;
}

export function EmployeeDetailError({ refetch, isLoading, errorStatus }: EmployeeDetailErrorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  const goBack = () => {
    router.push(`/employees?${params.toString()}`);
  };

  return (
    <div className="p-4">
      <Alert variant="destructive">
        <AlertDescription className="flex justify-between items-center">
          {errorStatus === 404 ? "Employee not found" : "Failed to load employee details"}
          {errorStatus === 404 ? (
            <Button onClick={() => goBack()} variant="destructive" size="xs" disabled={isLoading}>
              <ArrowLeftIcon className="w-4 h-4" />
              Back to list
            </Button>
          ) : (
            <Button onClick={() => refetch()} variant="destructive" size="xs" disabled={isLoading}>
              <RefreshCcwIcon className="w-4 h-4" />
              {isLoading ? "Loading..." : "Retry"}
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}
