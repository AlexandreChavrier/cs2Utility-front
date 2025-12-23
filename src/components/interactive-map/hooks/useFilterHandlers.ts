import { useCallback } from "react";
import { useRouter } from "next/navigation";

export const useFilterHandlers = (
  currentMapId: string | undefined,
  activeUtility: string | undefined
) => {
  const router = useRouter();

  const handleUtilityClick = useCallback(
    (utilityId: string) => {
      if (activeUtility === utilityId) {
        router.push(`/${currentMapId}`, { scroll: false });
      } else {
        router.push(`/${currentMapId}/${utilityId}`, { scroll: false });
      }
    },
    [activeUtility, currentMapId, router]
  );

  const handleMapClick = useCallback(
    (mapId: string) => {
      router.push(`/${mapId}`, { scroll: false });
    },
    [router]
  );

  return { handleUtilityClick, handleMapClick };
};
