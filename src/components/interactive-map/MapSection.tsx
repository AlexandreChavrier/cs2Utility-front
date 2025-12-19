"use client";

import FilterSection from "./components/FilterSection";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useLineupsStore from "../lineup/store/useLineupsStore";
import useMapsStore from "../map/store/useMapsStore";
import { useSyncMap } from "../map/hooks/useSyncMap";
import useActionsStore from "../action/store/useActionsStore";
import { useSyncActionsType } from "../action/hooks/useSyncActionsType";
import { sides } from "@/data/side/sides";
import { utilities } from "@/data/utility/utilities";
import MapWithPoints from "./components/MapWithPoints";
import { mapToFilterItems } from "./helpers/mapToFilterItems";
import { Utilities } from "@/data/utility/utilities.enum";

const MapSection = ({ image }: { image: string }) => {
  useSyncActionsType();

  const mapRef = useRef<HTMLDivElement>(null);
  const [mapHeight, setMapHeight] = useState(0);
  const [nukeView, setNukeView] = useState(false);

  const [activeUtility, setActiveUtility] = useState<string | null>(null);

  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null
  );

  const { actionTypes, actions } = useActionsStore();
  const { maps } = useMapsStore();
  const { currentMap } = useSyncMap();

  const { getLineups, lineups, destinationPoints } = useLineupsStore();

  const router = useRouter();
  const pathname = usePathname();
  const isNuke = pathname.includes("nuke");

  const mapsFilter = mapToFilterItems(maps);
  const actionTypesFilter = mapToFilterItems(actionTypes);
  const teamsFilters = mapToFilterItems(sides);
  const utilitiesFilters = mapToFilterItems(utilities);

  const handleUtilityClick = (utilityId: string) => {
    setActiveUtility(utilityId);
  };

  useEffect(() => {
    if (currentMap?.id && activeUtility) {
      getLineups({ map: currentMap.id, type: activeUtility });
    }
  }, [currentMap?.id, activeUtility]);

  useEffect(() => {
    const updateHeight = () => {
      if (mapRef.current) {
        setMapHeight(mapRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const displayImage = () => {
    if (isNuke) {
      if (!nukeView) {
        return "/assets/maps/nuke/radar-up.webp";
      }
      return "/assets/maps/nuke/radar-down.webp";
    }
    return image;
  };

  return (
    <div className="w-full max-w-[75%] flex flex-col lg:flex-row lg:items-start gap-8 rounded-2xl p-8 mx-auto">
      {/* Colonne filtres */}
      <div
        className="lg:basis-[25%] lg:max-w-[500px] w-full flex flex-col gap-6 overflow-y-auto pr-2"
        style={{ maxHeight: mapHeight > 0 ? `${mapHeight}px` : "auto" }}
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
          imageSrc={displayImage()}
          markers={
            [
              // {
              //   id: "Xbox",
              //   image: "/assets/utilityIcons/smokeBadge.webp",
              //   x: 48,
              //   y: 39.7,
              // },
            ]
          }
          isNuke={isNuke}
          nukeView={nukeView}
          onToggleNukeView={() => setNukeView(!nukeView)}
        />
      </div>
    </div>
  );
};

export default MapSection;
