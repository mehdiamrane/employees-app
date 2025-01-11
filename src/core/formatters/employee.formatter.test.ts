import EmployeeFormatter from "./employee.formatter";

describe("EmployeeFormatter", () => {
  describe("formatSalary", () => {
    it("should format salary with dots as thousand separators and add tilde and dash", () => {
      const testCases = [
        { input: 1000, expected: "~1.000,-" },
        { input: 1000000, expected: "~1.000.000,-" },
        { input: 1234567, expected: "~1.234.567,-" },
        { input: 999.99, expected: "~999,-" },
      ];

      testCases.forEach(({ input, expected }) => {
        const result = EmployeeFormatter.formatSalary(input);
        expect(result).toBe(expected);
      });
    });
  });
});
