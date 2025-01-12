import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export function useDeviceType() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const mobileMql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const tabletMql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);

    const onChange = () => {
      const width = window.innerWidth;
      setIsMobile(width < MOBILE_BREAKPOINT);
      setIsTablet(width < TABLET_BREAKPOINT);
      setIsLoading(false);
    };

    mobileMql.addEventListener("change", onChange);
    tabletMql.addEventListener("change", onChange);
    onChange(); // Set initial values

    return () => {
      mobileMql.removeEventListener("change", onChange);
      tabletMql.removeEventListener("change", onChange);
    };
  }, []);

  return { isMobile: !!isMobile, isTablet: !!isTablet, isLoading };
}
