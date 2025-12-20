"use client";

import FilterSection from "./components/FilterSection";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import useLineupsStore from "../lineup/store/useLineupsStore";
import useMapsStore from "../map/store/useMapsStore";
import { useSyncMap } from "../map/hooks/useSyncMap";
import useActionsStore from "../action/store/useActionsStore";
import MapWithPoints from "./components/MapWithPoints";
import {
  mapToFilterItems,
  teamsFilters,
  utilitiesFilters,
} from "./helpers/mapToFilterItems";

const MapSection = ({
  image,
  activeUtility,
}: {
  image: string;
  activeUtility?: string;
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapHeight, setMapHeight] = useState(0);
  const [nukeView, setNukeView] = useState(false);

  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null
  );
  const [selectedLineup, setSelectedLineup] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const isNuke = pathname.includes("nuke");

  const { actionTypes, actions } = useActionsStore();
  const { maps } = useMapsStore();
  const { currentMap } = useSyncMap();
  const { getLineups, lineups, destinationPoints } = useLineupsStore();

  useEffect(() => {
    if (currentMap?.id && activeUtility) {
      getLineups({ map: currentMap.id, type: activeUtility });
    }
    setSelectedDestination(null);
  }, [currentMap?.id, activeUtility]);

  useEffect(() => {
    if (!mapRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setMapHeight(entry.contentRect.height);
      }
    });
    observer.observe(mapRef.current);
    return () => observer.disconnect();
  }, []);

  const handleUtilityClick = (utilityId: string) => {
    if (activeUtility === utilityId) {
      router.push(`/${currentMap?.id}`);
    } else {
      router.push(`/${currentMap?.id}/${utilityId}`);
    }
  };

  const displayImage = () => {
    if (isNuke) {
      if (!nukeView) {
        return "/assets/maps/nuke/radar-up.webp";
      }
      return "/assets/maps/nuke/radar-down.webp";
    }
    return image;
  };

  const mapsFilter = useMemo(() => mapToFilterItems(maps), [maps]);
  const actionTypesFilter = useMemo(
    () => mapToFilterItems(actionTypes),
    [actionTypes]
  );

  console.log("%cMapSection RENDER", "color: #00e1ff");
  console.log("destinationPoints ref", destinationPoints);

  return (
    <div className="w-full max-w-[75%] flex flex-col lg:flex-row lg:items-start gap-8 rounded-2xl p-8 mx-auto">
      {/* Colonne filtres */}
      <div
        className="lg:basis-[25%] lg:max-w-[500px] w-full flex flex-col gap-6 overflow-y-auto pr-2"
        // style={{ maxHeight: mapHeight > 0 ? `${mapHeight}px` : "auto" }}
      >
        <div className="mt-3 flex flex-wrap gap-2">{"mirage > smoke > CT"}</div>
        <h3 className="mt-3 flex flex-wrap gap-2">{currentMap?.displayName}</h3>
        <FilterSection
          filters={teamsFilters}
          title="Equipes"
          onFilterClick={() => {
            return;
          }}
        />
        <FilterSection
          filters={utilitiesFilters}
          title="Utilitaires"
          onFilterClick={handleUtilityClick}
          activeFilterId={activeUtility}
        />
        <FilterSection
          filters={actionTypesFilter}
          title="Actions en jeu"
          onFilterClick={() => {
            return;
          }}
        />
        <FilterSection
          filters={mapsFilter}
          title="Cartes"
          onFilterClick={(mapId) => {
            router.push(`/${mapId}`);
            return;
          }}
        />
      </div>

      {/* Colonne carte */}
      <div
        ref={mapRef}
        className="flex-1 w-full bg-neutral-900 border border-neutral-800 rounded-md p-2"
      >
        <MapWithPoints
          mapImgUrl={displayImage()}
          destinationPoints={destinationPoints}
          isNuke={isNuke}
          nukeView={nukeView}
          onToggleNukeView={() => setNukeView(!nukeView)}
        />
      </div>
    </div>
  );
};

export default MapSection;
