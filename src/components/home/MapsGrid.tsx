"use client";

import React from "react";
import MapCard from "@/components/home/MapCard";
import ButtonRound from "@/components/ui/buttons/ButtonRound";
import Arrow from "@/components/ui/icons/Arrow";
import useMapsStore from "../store/useMapsStore";

const HeroMapsGrid = () => {
  const { maps } = useMapsStore();

  const topRowMaps = maps.slice(0, 4);
  const bottomRowMaps = maps.slice(4);

  return (
    <section className="w-full max-w-[70%] flex flex-col mt-16 gap-8 p-8 bg-neutral-900 border border-neutral-800 rounded-lg">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {topRowMaps.map((map) => (
          <div className="aspect-square" key={map.id}>
            <MapCard
              href={`/${map.id}`}
              image={map.imageUrl}
              title={map.displayName}
            />
          </div>
        ))}
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-8">
        {bottomRowMaps.map((map) => (
          <div className="aspect-square sm:aspect-[4/3]" key={map.id}>
            <MapCard
              href={`/${map.id}`}
              image={map.imageUrl}
              title={map.displayName}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroMapsGrid;
