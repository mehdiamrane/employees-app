import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render as rtlRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";

function render(ui: ReactElement, { route = "/" } = {}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return {
    user: userEvent.setup(),
    ...rtlRender(ui, {
      wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
    }),
  };
}

export * from "@testing-library/react";
export { render };
