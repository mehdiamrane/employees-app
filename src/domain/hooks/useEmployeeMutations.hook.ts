import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { EmployeeFormData, EmployeeModel } from "../models/employee.model";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  let loadingToast: string | number | undefined;

  return useMutation({
    mutationFn: (data: EmployeeFormData) => service.createEmployee(data),
    onMutate: async (newEmployee) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["getEmployeeList"] });

      // Snapshot the previous value
      const previousEmployees = queryClient.getQueryData<EmployeeModel[]>(["getEmployeeList"]);

      // Show loading toast
      loadingToast = toast.loading("Creating employee...");

      // Optimistically update to the new value
      if (previousEmployees) {
        const maxId = Math.max(...previousEmployees.map((emp) => emp.id), 0);
        queryClient.setQueryData<EmployeeModel[]>(["getEmployeeList"], (old = []) => [
          ...old,
          {
            id: maxId + 1, // Temporary ID based on highest existing ID, would not work in a real-world scenario
            ...newEmployee,
          } as EmployeeModel,
        ]);
      }

      return { previousEmployees };
    },
    onSuccess: (employee) => {
      toast.success("Employee created successfully!");
      toast.dismiss(loadingToast);
      return employee;
    },
    onError: (err, newEmployee, context) => {
      toast.error("Failed to create employee", { description: err.message });
      toast.dismiss(loadingToast);
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousEmployees) {
        queryClient.setQueryData(["getEmployeeList"], context.previousEmployees);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["getEmployeeList"] });
    },
  });
};

export const useUpdateEmployee = (id: number) => {
  const queryClient = useQueryClient();
  let loadingToast: string | number | undefined;

  return useMutation({
    mutationFn: (data: EmployeeFormData) => service.updateEmployeeById({ id, ...data }),
    onMutate: async (updatedEmployee) => {
      await queryClient.cancelQueries({ queryKey: ["getEmployee", id] });
      await queryClient.cancelQueries({ queryKey: ["getEmployeeList"] });

      // Snapshot the previous values
      const previousEmployee = queryClient.getQueryData<EmployeeModel>(["getEmployee", id]);
      const previousEmployees = queryClient.getQueryData<EmployeeModel[]>(["getEmployeeList"]);

      // Show loading toast
      loadingToast = toast.loading("Updating employee...");

      // Optimistically update
      const optimisticEmployee = { id, ...updatedEmployee } as EmployeeModel;

      queryClient.setQueryData(["getEmployee", id], optimisticEmployee);

      if (previousEmployees) {
        queryClient.setQueryData<EmployeeModel[]>(["getEmployeeList"], (old = []) =>
          old.map((employee) => (employee.id === id ? optimisticEmployee : employee))
        );
      }

      return { previousEmployee, previousEmployees };
    },
    onSuccess: () => {
      toast.success("Employee updated successfully!");
      toast.dismiss(loadingToast);
    },
    onError: (err, _newEmployee, context) => {
      toast.error("Failed to update employee", { description: err.message });
      toast.dismiss(loadingToast);

      // Roll back both queries on failure
      if (context?.previousEmployee) {
        queryClient.setQueryData(["getEmployee", id], context.previousEmployee);
      }
      if (context?.previousEmployees) {
        queryClient.setQueryData(["getEmployeeList"], context.previousEmployees);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployee", id] });
      queryClient.invalidateQueries({ queryKey: ["getEmployeeList"] });
    },
  });
};

export const useDeleteEmployee = (id: number) => {
  const queryClient = useQueryClient();
  let loadingToast: string | number | undefined;

  return useMutation({
    mutationFn: () => service.deleteEmployeeById({ id }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["getEmployee", id] });
      await queryClient.cancelQueries({ queryKey: ["getEmployeeList"] });

      // Snapshot the previous values
      const previousEmployee = queryClient.getQueryData<EmployeeModel>(["getEmployee", id]);
      const previousEmployees = queryClient.getQueryData<EmployeeModel[]>(["getEmployeeList"]);

      // Show loading toast
      loadingToast = toast.loading("Deleting employee...");

      // Optimistically remove from lists
      if (previousEmployees) {
        queryClient.setQueryData<EmployeeModel[]>(["getEmployeeList"], (old = []) =>
          old.filter((employee) => employee.id !== id)
        );
      }
      queryClient.removeQueries({ queryKey: ["getEmployee", id] });

      return { previousEmployee, previousEmployees };
    },
    onSuccess: () => {
      toast.success("Employee deleted successfully!");
      toast.dismiss(loadingToast);
    },
    onError: (err, _variables, context) => {
      toast.error("Failed to delete employee", { description: err.message });
      toast.dismiss(loadingToast);

      // Roll back optimistic updates
      if (context?.previousEmployees) {
        queryClient.setQueryData(["getEmployeeList"], context.previousEmployees);
      }
      if (context?.previousEmployee) {
        queryClient.setQueryData(["getEmployee", id], context.previousEmployee);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployeeList"] });
    },
  });
};
