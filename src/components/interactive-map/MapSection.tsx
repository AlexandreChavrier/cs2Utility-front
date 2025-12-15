"use client";

import { maps } from "@/data/maps";
import FilterSection, { FilterItem } from "./FilterSection";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MapWithStableMarkers from "./MapWithStableMarkers";
import { Utilities } from "@/data/enums/utilities.enum";
import useLineupsStore from "./store/useLineupsStore";

const MapSection = ({ image }: { image: string }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapHeight, setMapHeight] = useState(0);
  const [nukeView, setNukeView] = useState(false);

  const { getLineups, lineups } = useLineupsStore();

  const mapsFilters: FilterItem[] = maps
    .filter((map) => map.active)
    .map((map) => ({
      filterName: map.name,
      icon: map.icon,
    }));

  const router = useRouter();
  const pathname = usePathname();
  const isNuke = pathname.includes("nuke");

  const displayImage = () => {
    if (isNuke) {
      if (!nukeView) {
        return "/assets/maps/nuke/radar-up.webp";
      }
      return "/assets/maps/nuke/radar-down.webp";
    }
    return image;
  };

  const currentMap = "";

  const teamsFilters: FilterItem[] = [
    { filterName: "Any", icon: "/assets/sideIcons/both.webp" },
    { filterName: "T", icon: "/assets/sideIcons/ct.webp" },
    { filterName: "CT", icon: "/assets/sideIcons/t.webp" },
  ];

  const utilitiesFilters: FilterItem[] = [
    { filterName: "Smokes", icon: "/assets/utilityIcons/smoke.webp" },
    { filterName: "Molotovs", icon: "/assets/utilityIcons/molotov.webp" },
    { filterName: "Grenades", icon: "/assets/utilityIcons/grenade.webp" },
    { filterName: "Flashes", icon: "/assets/utilityIcons/flash.webp" },
  ];

  const inGameActions: FilterItem[] = [
    { filterName: "Boosts", icon: "/assets/inGameActions/boost.webp" },
    { filterName: "Wallbangs", icon: "/assets/inGameActions/wallbang.webp" },
    {
      filterName: "Prefire lines",
      icon: "/assets/inGameActions/prefireLine.webp",
    },
    {
      filterName: "Bomb safe plant",
      icon: "/assets/inGameActions/bombSafePlant.webp",
    },
  ];

  useEffect(() => {
    // ✅ Appelle l'API
    getLineups({ map: "dust2", type: Utilities.SMOKE });
  }, []);

  console.log(lineups);

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

  return (
    <div className="w-full max-w-[75%] flex flex-col lg:flex-row lg:items-start gap-8 rounded-2xl p-8 mx-auto">
      {/* Colonne filtres */}
      <div
        className="lg:basis-[25%] lg:max-w-[500px] w-full flex flex-col gap-6 overflow-y-auto pr-2"
        style={{ maxHeight: mapHeight > 0 ? `${mapHeight}px` : "auto" }}
      >
        <div className="mt-3 flex flex-wrap gap-2">{"mirage > smoke > CT"}</div>
        <h3 className="mt-3 flex flex-wrap gap-2">{currentMap}</h3>

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
          onFilterClick={() => {
            return;
          }}
        />
        <FilterSection
          filters={inGameActions}
          title="Actions en jeu"
          onFilterClick={() => {
            return;
          }}
        />
        <FilterSection
          filters={mapsFilters}
          title="Cartes"
          onFilterClick={(map) => {
            router.push(`/${map.toLowerCase()}`);
            return;
          }}
        />
      </div>

      {/* Colonne carte */}
      <div
        ref={mapRef}
        className="flex-1 w-full bg-neutral-900 border border-neutral-800 rounded-md p-2"
      >
        <MapWithStableMarkers
          imageSrc={displayImage()}
          markers={[
            {
              id: "Xbox",
              image: "/assets/utilityIcons/smokeBadge.webp",
              x: 48,
              y: 39.7,
            },
          ]}
          isNuke={isNuke}
          nukeView={nukeView}
          onToggleNukeView={() => setNukeView(!nukeView)}
        />
      </div>
    </div>
  );
};

export default MapSection;
