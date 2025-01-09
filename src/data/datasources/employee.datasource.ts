import EmployeeDatasourceContract from "@/domain/contracts/employeeDatasource.contract";
import { EmployeeListModel, EmployeeListSchema, EmployeeModel, EmployeeSchema } from "@/domain/models/employee.model";
import { GetEmployeeByIdParams } from "@/domain/params/employee.param";
import { EmployeeFormData } from "@/domain/schemas/employee.schema";

export default class EmployeeDatasource extends EmployeeDatasourceContract {
  public async getEmployeeList(): Promise<EmployeeListModel | undefined> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/employees`);

      // Validate response
      if (response.status !== 200) {
        return undefined;
      }

      // Obtain json from response
      const json = await response.json();
      // Extract data
      const data = json["data"];

      return EmployeeListSchema.parse(data);
    } catch (exception) {
      console.error("getEmployeeList exception:", exception);
      return undefined;
    }
  }

  public async createEmployee(params: EmployeeFormData): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      // Validate response
      if (response.status !== 201) {
        return undefined;
      }

      // Obtain json from response
      const json = await response.json();
      // Extract data
      const data = json["data"];

      return EmployeeSchema.parse(data);
    } catch (exception) {
      console.error("createEmployee exception:", exception);
      return undefined;
    }
  }

  public async getEmployeeById(params: GetEmployeeByIdParams): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/employee/${params.id}`);

      // Validate response
      if (response.status !== 200) {
        return undefined;
      }

      // Obtain json from response
      const json = await response.json();
      // Extract data
      const data = json["data"];

      return EmployeeSchema.parse(data);
    } catch (exception) {
      console.error("getEmployeeById exception:", exception);
      return undefined;
    }
  }

  public async updateEmployeeById(params: { id: number } & EmployeeFormData): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/update/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      // Validate response
      if (response.status !== 200) {
        return undefined;
      }

      // Obtain json from response
      const json = await response.json();
      // Extract data
      const data = json["data"];

      return EmployeeSchema.parse(data);
    } catch (exception) {
      console.error("updateEmployeeById exception:", exception);
      return undefined;
    }
  }

  public deleteEmployeeById(params: unknown): Promise<EmployeeModel | undefined> {
    throw new Error("Method not implemented.");
  }
}
