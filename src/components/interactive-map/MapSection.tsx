"use client";

import FilterSection from "./components/FilterSection";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useLineupsStore from "../lineup/store/useLineupsStore";
import useMapsStore from "../map/store/useMapsStore";
import { useSyncMap } from "../map/hooks/useSyncMap";
import useActionsStore from "../action/store/useActionsStore";
import MapWithPoints from "./components/MapWithPoints";
import { teamsFilters, utilitiesFilters } from "./helpers/mapToFilterItems";
import { useDisplayRadarImage } from "./hooks/useDisplayRadarImage";
import { useMapHeight } from "./hooks/useMapHeight";
import { useFilterHandlers } from "./hooks/useFilterHandlers";

const noOpHandler = () => {};

const MapSection = ({
  radarMapImage,
  activeUtility,
}: {
  radarMapImage: string;
  activeUtility?: string;
}) => {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null
  );
  const [selectedLineup, setSelectedLineup] = useState<string | null>(null);

  const pathname = usePathname();
  const isNuke = pathname.includes("nuke");

  const { actionTypeFilters } = useActionsStore();
  const { mapFilters } = useMapsStore();
  const { currentMap } = useSyncMap();
  const { getLineups, clearLineups, destinationPoints } = useLineupsStore();

  const { handleMapClick, handleUtilityClick } = useFilterHandlers(
    currentMap?.id,
    activeUtility
  );

  const { displayImage, nukeView, toggleNukeView } = useDisplayRadarImage(
    isNuke,
    radarMapImage
  );
  const { mapHeight, mapRef } = useMapHeight();

  useEffect(() => {
    if (currentMap?.id && activeUtility) {
      getLineups({ map: currentMap.id, type: activeUtility });
    } else if (currentMap?.id && !activeUtility) {
      clearLineups();
    }
    setSelectedDestination(null);
  }, [currentMap?.id, activeUtility]);

  return (
    <div className="w-full max-w-[75%] flex flex-col lg:flex-row lg:items-start gap-8 rounded-2xl p-8 mx-auto">
      {/* Colonne filtres */}
      <div
        className="lg:basis-[25%] lg:max-w-[500px] w-full flex flex-col gap-6 overflow-y-auto pr-2 scrollbar-thin"
        style={{ maxHeight: mapHeight > 0 ? `${mapHeight}px` : "auto" }}
      >
        <h3 className="mt-3 flex flex-wrap gap-2">{currentMap?.displayName}</h3>
        <FilterSection
          filters={teamsFilters}
          title="Equipes"
          onFilterClick={noOpHandler}
        />
        <FilterSection
          filters={utilitiesFilters}
          title="Utilitaires"
          onFilterClick={handleUtilityClick}
          activeFilterId={activeUtility}
        />
        <FilterSection
          filters={actionTypeFilters}
          title="Actions en jeu"
          onFilterClick={noOpHandler}
        />
        <FilterSection
          filters={mapFilters}
          title="Cartes"
          onFilterClick={handleMapClick}
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
          onToggleNukeView={toggleNukeView}
        />
      </div>
    </div>
  );
};

export default MapSection;
