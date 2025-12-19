"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import useMapsStore from "../store/useMapsStore";

export function useSyncMap() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { maps } = useMapsStore();

  const currentMapId = params.map as string | undefined;

  const currentMap = maps.find((m) => m.id === currentMapId);

  const setCurrentMap = (newMapId: string) => {
    router.push(`/${newMapId}`);
  };

  const isOnMapPage = pathname?.startsWith("/") && pathname !== "/";

  return {
    currentMapId: currentMapId || null,
    currentMap: currentMap || null,
    setCurrentMap,
    isOnMapPage,
  };
}
