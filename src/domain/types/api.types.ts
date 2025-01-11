import { EmployeeListModel, EmployeeModel } from "../models/employee.model";

export interface BaseResponse<T> {
  status: string;
  message: string;
  data: T;
}

export type EmployeeResponse = BaseResponse<EmployeeModel>;
export type EmployeeListResponse = BaseResponse<EmployeeListModel>;
