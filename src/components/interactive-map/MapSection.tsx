"use client";

import FilterSection from "./components/FilterSection";
import { usePathname } from "next/navigation";
import useMapsStore from "../store/useMapsStore";
import useActionsStore from "../store/useActionsStore";
import MapWithPoints from "./components/MapWithPoints";
import { teamsFilters, utilitiesFilters } from "./helpers/mapToFilterItems";
import { useDisplayRadarImage } from "./hooks/overlay/useDisplayRadarImage";
import { useGetDestinationPoints } from "./hooks/map-data/useGetDestinationPoints";
import { useFilters } from "./hooks/filters/useFilters";
import { useSelectedDestination } from "./hooks/map-data/useSelectedDestination";
import { useEffect, useMemo } from "react";
import { useFilterHandlers } from "./hooks/filters/useFilterHandlers";
import { useGetLineupPoints } from "./hooks/map-data/useGetLineupPoints";
import { useMapDataFetching } from "./hooks/map-data/useMapDataFetching";
import TwoColumnsLayout from "../layouts/TwoColumnsLayout";
import useAuthStore from "../auth/store/useAuthStore";
import { useDictionary } from "@/utils/providers/dictionaryProvider";
import { upperFirst } from "lodash";

const MapSection = ({
  radarMapImage,
  activeUtility,
}: {
  radarMapImage: string;
  activeUtility?: string;
}) => {
  const pathname = usePathname();
  const isNuke = pathname.includes("nuke");
  const dictionary = useDictionary();

  const { isAuthenticated } = useAuthStore();

  const { mapFilters, currentMap } = useMapsStore();
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
  }, [filters.side, filters.actions, clearSelectedDestination]);

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
          {/* BreadCrumbsNavigationHere */}
          <h1
            className="mt-3 flex flex-wrap gap-2 text-heading-h3"
            id="map-title"
          >
            {currentMap?.displayName}
          </h1>
          <FilterSection
            filters={teamsFilters}
            title={upperFirst(dictionary.interactiveMap.teams)}
            onFilterClick={handleSideClick}
            activeFilterId={hasActiveActions ? undefined : filters.side}
            disabled={hasActiveActions}
          />
          <FilterSection
            filters={utilitiesFilters}
            title={upperFirst(dictionary.interactiveMap.utilities)}
            onFilterClick={handleUtilityClick}
            activeFilterId={activeUtility}
          />
          <FilterSection
            filters={actionTypeFilters}
            title={upperFirst(dictionary.interactiveMap.actions)}
            onFilterClick={handleActionTypeClick}
            activeFilterId={filters.actions}
            disabled={!isAuthenticated}
          />
          <FilterSection
            filters={mapFilters}
            title={upperFirst(dictionary.interactiveMap.maps)}
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
