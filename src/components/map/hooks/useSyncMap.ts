"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import useMapsStore from "../store/useMapsStore";
import { useEffect, useMemo } from "react";

export function useSyncMap() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { maps, isFetching, getActiveMaps } = useMapsStore();

  useEffect(() => {
    if (!isFetching && maps.length === 0) {
      getActiveMaps();
    }
  }, [isFetching, maps.length, getActiveMaps]);

  const currentMapId = params.map as string | undefined;
  const currentMap = maps.find((m) => m.id === currentMapId);

  const setCurrentMap = (newMapId: string) => {
    router.push(`/${newMapId}`);
  };

  const isOnMapPage = pathname?.startsWith("/") && pathname !== "/";

  return useMemo(
    () => ({
      currentMap: currentMap || null,
      setCurrentMap,
      isOnMapPage,
    }),
    [currentMap, isOnMapPage]
  );
}
