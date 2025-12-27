"use client";

import FilterSection from "./components/FilterSection";
import { usePathname } from "next/navigation";
import useMapsStore from "../map/store/useMapsStore";
import { useSyncMap } from "../map/hooks/useSyncMap";
import useActionsStore from "../action/store/useActionsStore";
import MapWithPoints from "./components/MapWithPoints";
import { teamsFilters, utilitiesFilters } from "./helpers/mapToFilterItems";
import { useDisplayRadarImage } from "./hooks/overlay/useDisplayRadarImage";
import { useMapHeight } from "./hooks/overlay/useMapHeight";
import { useGetDestinationPoints } from "./hooks/map-data/useGetDestinationPoints";
import { useFilters } from "./hooks/filters/useFilters";
import { useSelectedDestination } from "./hooks/map-data/useSelectedDestination";
import { useEffect, useMemo } from "react";
import { useFilterHandlers } from "./hooks/filters/useFilterHandlers";
import { useGetLineupPoints } from "./hooks/map-data/useGetLineupPoints";
import { useMapDataFetching } from "./hooks/map-data/useMapDataFetching";
import TwoColumnsLayout from "../layouts/TwoColumnsLayout";

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

  const {
    selectedDestinationPointId,
    selectDestination,
    clearSelectedDestination,
  } = useSelectedDestination();
  const { destinationPoints } = useGetDestinationPoints({ activeUtility });
  const { lineupPoints } = useGetLineupPoints({
    destinationPointId: selectedDestinationPointId,
  });
  const { filters } = useFilters();

  const { displayImage, nukeView, toggleNukeView } = useDisplayRadarImage(
    isNuke,
    radarMapImage
  );
  const {
    handleMapClick,
    handleUtilityClick,
    handleSideClick,
    handleActionTypeClick,
  } = useFilterHandlers(currentMap?.id, activeUtility);

  useMapDataFetching({ mapId: currentMap?.id, activeUtility });

  useEffect(() => {
    clearSelectedDestination();
  }, [filters.side, filters.actions]);

  const destinationPointsToShow = useMemo(() => {
    if (!selectedDestinationPointId) {
      return destinationPoints;
    }
    return destinationPoints.filter(
      (point) => point.uuid === selectedDestinationPointId
    );
  }, [destinationPoints, selectedDestinationPointId]);

  const hasActiveActions = filters.actions.length > 0;

  return (
    <TwoColumnsLayout
      leftColumn={
        <>
          <h3 className="mt-3 flex flex-wrap gap-2">
            {currentMap?.displayName}
          </h3>
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
        </>
      }
      rightColumn={
        <>
          <MapWithPoints
            mapImgUrl={displayImage}
            destinationPoints={destinationPointsToShow}
            lineupPoints={lineupPoints}
            selectedDestinationId={selectedDestinationPointId ?? undefined}
            onDestinationClick={selectDestination}
            isNuke={isNuke}
            nukeView={nukeView}
            onToggleNukeView={toggleNukeView}
            onBackClick={clearSelectedDestination}
          />
        </>
      }
    />
  );
};

export default MapSection;
