import Image from "next/image";
import { useState } from "react";
import { GameMap, maps } from "@/data/maps";
import FilterSection, { FilterItem } from "./FilterSection";

const MapSection = () => {
  const [selectedMap, setSelectedMap] = useState<GameMap>(
    maps.find((map) => map.active) || maps[0]
  );

  const handleMapClick = (filterName: string) => {
    const map = maps.find((m) => m.name === filterName);
    if (map) {
      setSelectedMap(map);
    }
  };

  const mapsFilters: FilterItem[] = maps
    .filter((map) => map.active)
    .map((map) => ({
      filterName: map.name,
      icon: map.icon,
    }));

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

  return (
    <div className="w-full max-w-[1440px] 2xl:max-w-[1680px] flex flex-col lg:flex-row gap-8 rounded-2xl p-8 mx-auto">
      {/* Colonne filtres */}
      <div className="lg:basis-[25%] lg:max-w-[500px] w-full p-6 flex flex-col gap-6">
        <div className="mt-3 flex flex-wrap gap-2">{"mirage > smoke > CT"}</div>
        <h3 className="mt-3 flex flex-wrap gap-2">
          {selectedMap?.name || "Mirage"}
        </h3>

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
          onFilterClick={handleMapClick}
        />
      </div>

      {/* Colonne carte */}
      <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-md p-2 relative min-h-0 lg:min-h-[520px]">
        <div className="relative w-full h-full rounded-lg overflow-hidden aspect-[4/3]">
          <Image
            src={selectedMap?.radarImage || "/assets/maps/mirage/radar.webp"}
            fill
            alt={`${selectedMap?.name || "map"} map`}
            className="object-contain"
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          {/* Overlay pour les infos */}
          {/* <div className="pointer-events-none absolute inset-0"> */}
          {/* Exemple de marqueur */}
          {/* <div className="absolute top-[32%] left-[48%] -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 rounded-full bg-purple-500 ring-4 ring-purple-500/30" />
              <span className="mt-2 block text-xs text-white text-center">
                Smoke CT
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MapSection;
