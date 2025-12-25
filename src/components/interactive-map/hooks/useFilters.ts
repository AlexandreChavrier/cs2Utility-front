import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

export type Filters = {
  side: string;
  actions: string[];
};

export const useFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters: Filters = useMemo(() => {
    return {
      side: searchParams.get("side") || "any",
      actions: searchParams.get("actions")?.split(",").filter(Boolean) || [],
    };
  }, [searchParams]);

  const setSideFilters = useCallback(
    (sideId: string) => {
      const params = new URLSearchParams(searchParams);

      if (sideId && sideId !== "any") {
        params.set("side", sideId);
      } else {
        params.delete("side");
      }

      const query = params.toString();
      const newUrl = `${pathname}${query ? `?${query}` : ""}`;

      router.replace(newUrl, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const toggleActionFilters = useCallback(
    (actionId: string, currentMapId: string | undefined) => {
      const params = new URLSearchParams(searchParams);
      const currentActions =
        params.get("actions")?.split(",").filter(Boolean) || [];

      let newActions: string[];

      if (currentActions.includes(actionId)) {
        newActions = currentActions.filter((action) => action !== actionId);
      } else {
        newActions = [...currentActions, actionId];
      }

      if (newActions.length > 0) {
        params.set("actions", newActions.join(","));
      } else {
        params.delete("actions");
      }

      const query = params.toString();
      const newUrl = `/${currentMapId}${query ? `?${query}` : ""}`;

      router.replace(newUrl, { scroll: false });
    },
    [searchParams, router, pathname]
  );
  const clearFilters = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  return {
    filters,
    setSideFilters,
    toggleActionFilters,
    clearFilters,
  };
};
