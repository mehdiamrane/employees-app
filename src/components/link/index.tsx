import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import { ComponentPropsWithRef, forwardRef } from "react";

type LinkProps = ComponentPropsWithRef<typeof NextLink>;

// This is a custom Link component that preserves the search params when navigating.
export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const href = (() => {
    // Parse existing params if any
    const [baseUrl, existingParams] = (typeof props.href === "string" ? props.href : props.href.toString()).split("?");
    const targetParams = new URLSearchParams(existingParams);

    // Merge current params with existing ones
    currentParams.forEach((value, key) => {
      if (!targetParams.has(key)) {
        targetParams.set(key, value);
      }
    });

    return `${baseUrl}${targetParams.toString() ? "?" + targetParams.toString() : ""}`;
  })();

  return <NextLink ref={ref} {...props} href={href} />;
});

Link.displayName = "Link";
