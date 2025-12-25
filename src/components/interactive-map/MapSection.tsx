"use client";

import FilterSection from "./components/FilterSection";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import useLineupsStore from "../lineup/store/useLineupsStore";
import useMapsStore from "../map/store/useMapsStore";
import { useSyncMap } from "../map/hooks/useSyncMap";
import useActionsStore from "../action/store/useActionsStore";
import MapWithPoints from "./components/MapWithPoints";
import { teamsFilters, utilitiesFilters } from "./helpers/mapToFilterItems";
import { useDisplayRadarImage } from "./hooks/useDisplayRadarImage";
import { useMapHeight } from "./hooks/useMapHeight";
import { useFilterHandlers } from "./hooks/useFilterHandlers";
import { useFilteredMapData } from "./hooks/useFilteredMapData";
import { useMapDataFetching } from "./hooks/useMapDataFetching";

const MapSection = ({
  radarMapImage,
  activeUtility,
}: {
  radarMapImage: string;
  activeUtility?: string;
}) => {
  const pathname = usePathname();
  const isNuke = pathname.includes("nuke");

  const { mapFilters } = useMapsStore();
  const { currentMap } = useSyncMap();
  const { actionTypeFilters } = useActionsStore();

  const { destinationPoints, filters } = useFilteredMapData({
    activeUtility,
  });

  const { displayImage, nukeView, toggleNukeView } = useDisplayRadarImage(
    isNuke,
    radarMapImage
  );
  const { mapHeight, mapRef } = useMapHeight();
  const {
    handleMapClick,
    handleUtilityClick,
    handleSideClick,
    handleActionTypeClick,
  } = useFilterHandlers(currentMap?.id, activeUtility);

  useMapDataFetching({ mapId: currentMap?.id, activeUtility });

  const hasActiveActions = filters.actions.length > 0;

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
          onFilterClick={handleSideClick}
          activeFilterId={hasActiveActions ? undefined : filters.side}
          disabled={hasActiveActions}
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
          onFilterClick={handleActionTypeClick}
          activeFilterId={filters.actions}
        />
        <FilterSection
          filters={mapFilters}
          title="Cartes"
          onFilterClick={handleMapClick}
          activeFilterId={currentMap?.id}
        />
      </div>

      {/* Colonne carte */}
      <div
        ref={mapRef}
        className="flex-1 w-full bg-neutral-900 border border-neutral-800 rounded-md p-2"
      >
        <MapWithPoints
          mapImgUrl={displayImage}
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
