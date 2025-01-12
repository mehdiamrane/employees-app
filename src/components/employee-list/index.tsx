import { EmployeeTable } from "@/components/employee-table";
import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetEmployeeList } from "@/domain/hooks/useGetEmployeeList.hook";
import debounce from "lodash/debounce";
import { Search, UserPlus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";

export function EmployeeList() {
  const { data, isLoading, isError, refetch } = useGetEmployeeList();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("q") ?? "";
  const [searchInputValue, setSearchInputValue] = useState(searchQuery);
  const deferredSearchQuery = useDeferredValue(searchInputValue.trim());

  const filteredData = useMemo(
    () => data?.filter((employee) => employee.employee_name.toLowerCase().includes(deferredSearchQuery.toLowerCase())),
    [data, deferredSearchQuery]
  );

  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      value.trim() ? params.set("q", value.trim()) : params.delete("q");
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        router.replace(`${pathname}?${createQueryString(value)}`);
      }, 300),
    [pathname, createQueryString, router]
  );

  const onSearchInputValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInputValue(e.target.value);
      handleSearch(e.target.value);
    },
    [handleSearch]
  );

  // Clean up debounce on unmount
  useEffect(() => handleSearch.cancel, [handleSearch]);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employees {filteredData && <span>({filteredData.length})</span>}</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/employees/create">
              <UserPlus className="w-4 h-4" />
              Add new
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name..."
          className="pl-8"
          value={searchInputValue}
          onChange={onSearchInputValueChange}
        />
      </div>

      <EmployeeTable data={filteredData} isLoading={isLoading} isError={isError} refetch={refetch} />
    </>
  );
}
