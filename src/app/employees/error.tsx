"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

interface EmployeesErrorProps {
  error: Error;
  reset: () => void;
}

export default function EmployeesError({ error, reset }: EmployeesErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-4 pr-0">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex items-center justify-between gap-3">
          <div className="space-y-2">
            <p>Something went wrong while loading the employee details.</p>
            <p className="text-xs opacity-80">{error.message}</p>
          </div>
          <Button variant="destructive" size="sm" onClick={reset}>
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
