import { render, screen } from "@/test/test-utils";
import { EmployeeTable } from "./index";

describe("EmployeeTable", () => {
  const mockEmployees = [
    { id: 1, employee_name: "John Doe", employee_salary: 50000, employee_age: 30, profile_image: "" },
    { id: 2, employee_name: "Jane Smith", employee_salary: 60000, employee_age: 25, profile_image: "" },
  ];

  it("renders loading state", () => {
    render(<EmployeeTable data={[]} isLoading={true} isError={false} refetch={() => {}} />);
    expect(screen.getByTestId("employee-table-skeleton")).toBeInTheDocument();
  });

  it("renders error state", () => {
    render(<EmployeeTable data={[]} isLoading={false} isError={true} refetch={() => {}} />);
    expect(screen.getByTestId("employee-table-error")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(<EmployeeTable data={[]} isLoading={false} isError={false} refetch={() => {}} />);
    expect(screen.getByText(/no employees found/i)).toBeInTheDocument();
  });

  it("renders employee list correctly", () => {
    render(<EmployeeTable data={mockEmployees} isLoading={false} isError={false} refetch={() => {}} />);
    expect(screen.getByText("2 employees")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
});
