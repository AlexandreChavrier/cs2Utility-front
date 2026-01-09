"use client";

import useMapsStore from "@/components/store/useMapsStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export function useSyncMap() {
  const { maps, isFetching, getActiveMaps } = useMapsStore();
  const params = useParams();
  const { setCurrentMapId, currentMapId } = useMapsStore();

  useEffect(() => {
    if (!isFetching && maps.length === 0) {
      getActiveMaps();
    }
  }, [isFetching, maps.length, getActiveMaps]);

  useEffect(() => {
    const mapId = params.map as string;
    if (mapId && mapId !== currentMapId) {
      setCurrentMapId(mapId);
    }
  }, [params.map, setCurrentMapId, currentMapId]);
}
