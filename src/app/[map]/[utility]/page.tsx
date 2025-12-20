"use client";

import { useParams, notFound } from "next/navigation";
import { useEffect } from "react";
import { useSyncMap } from "@/components/map/hooks/useSyncMap";
import useMapsStore from "@/components/map/store/useMapsStore";
import MapSection from "@/components/interactive-map/MapSection";

const VALID_UTILITIES = ["smoke", "molotov", "flash", "he"];

export default function MapUtilityPage() {
  const params = useParams();
  const currentUtility = params.utility as string;

  const { isFetching } = useMapsStore();
  const { currentMap } = useSyncMap();

  if (!VALID_UTILITIES.includes(currentUtility)) {
    notFound();
  }
  if (!isFetching && currentMap) {
    return (
      <main>
        <section className="flex flex-col items-center pb-32 pt-12">
          <MapSection
            image={currentMap?.radarUrl}
            activeUtility={currentUtility}
          />
        </section>
      </main>
    );
  }
}
