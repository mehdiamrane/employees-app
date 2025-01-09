import { useQuery } from "@tanstack/react-query";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useGetEmployee = (id: number) => {
  return useQuery({
    queryKey: ["getEmployee", id],
    queryFn: () => service.getEmployeeById({ id }),
  });
};
