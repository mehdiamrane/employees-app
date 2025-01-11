import { z } from "zod";
import { EmployeeFormSchema } from "../models/employee.model";

const IdSchema = z.object({ id: z.number().positive() });

export const GetEmployeeByIdSchema = IdSchema;
export const DeleteEmployeeSchema = IdSchema;
export const UpdateEmployeeSchema = IdSchema.merge(EmployeeFormSchema);

export type GetEmployeeByIdParams = z.infer<typeof GetEmployeeByIdSchema>;
export type CreateEmployeeParams = z.infer<typeof EmployeeFormSchema>;
export type UpdateEmployeeParams = z.infer<typeof UpdateEmployeeSchema>;
export type DeleteEmployeeParams = z.infer<typeof DeleteEmployeeSchema>;
