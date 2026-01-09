import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useFilters } from "./useFilters";

export const useFilterHandlers = (
  currentMapId: string | undefined,
  activeUtility: string | undefined
) => {
  const router = useRouter();
  const { setSideFilters, toggleActionFilters } = useFilters();

  const handleUtilityClick = useCallback(
    (utilityId: string) => {
      if (activeUtility === utilityId) {
        router.push(`/${currentMapId}`, { scroll: false });
      } else {
        router.push(`/${currentMapId}/utility/${utilityId}`, { scroll: false });
      }
    },
    [activeUtility, currentMapId, router]
  );

  const handleActionTypeClick = useCallback(
    (actionTypeId: string) => {
      toggleActionFilters(actionTypeId, currentMapId);
    },
    [toggleActionFilters, currentMapId]
  );

  const handleMapClick = useCallback(
    (mapId: string) => {
      router.push(`/${mapId}`, { scroll: false });
    },
    [router]
  );

  const handleSideClick = useCallback(
    (sideId: string) => {
      setSideFilters(sideId);
    },
    [setSideFilters]
  );

  return {
    handleUtilityClick,
    handleMapClick,
    handleSideClick,
    handleActionTypeClick,
  };
};
