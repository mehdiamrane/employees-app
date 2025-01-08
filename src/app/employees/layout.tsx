import { ReactNode } from "react";

interface EmployeeLayoutProps {
  children: ReactNode;
  detail: ReactNode;
}

const EmployeeLayout = ({ children, detail }: EmployeeLayoutProps) => {
  return (
    <div className="flex h-full gap-4">
      <div className="flex-1">{children}</div>
      <div className="w-[400px] border-l min-h-screen">{detail}</div>
    </div>
  );
};

export default EmployeeLayout;
