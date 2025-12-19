"use client";

import MapSection from "@/components/interactive-map/MapSection";
import { useSyncMap } from "@/components/map/hooks/useSyncMap";
import useMapsStore from "@/components/map/store/useMapsStore";

export default function MapPage() {
  const { isFetching } = useMapsStore();
  const { currentMap } = useSyncMap();

  if (!isFetching && currentMap)
    return (
      <main>
        <section className="flex flex-col items-center pb-32 pt-12">
          <MapSection image={currentMap.radarUrl} />
        </section>
      </main>
    );
}
