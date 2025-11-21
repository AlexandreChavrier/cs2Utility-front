
import React from "react";
import { maps } from "@/data/maps";
import MapCard from "@/components/ui/cards/MapCard";
import ButtonRound from "@/components/ui/buttons/ButtonRound";
import Arrow from "@/components/ui/icons/Arrow";

const HeroMapsGrid = () => {
  const topRowMaps = maps.slice(0, 4);
  const bottomRowMaps = maps.slice(4);

  return (
    <div className="w-full 2xl:max-w-[1680px] max-w-[1440px] flex flex-col mt-16 gap-8 p-8 bg-neutral-900 border border-neutral-800 rounded-lg">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {topRowMaps.map(map => (
          <div className="aspect-square" key={map.id}>
            <MapCard
              href={map.link}
              image={map.image}
              title={map.name}
              icon={
                <ButtonRound
                  variant="purple"
                  icon={<Arrow />}
                />
              }
              className="before:absolute before:inset-0 before:bg-black/50 before:transition-all hover:before:bg-black/30"
            />
          </div>
        ))}
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-8">
        {bottomRowMaps.map(map => (
          <div className="aspect-square sm:aspect-[4/3]" key={map.id}>
            <MapCard
              href={map.link}
              image={map.image}
              title={map.name}
              icon={
                <ButtonRound
                  variant="purple"
                  icon={<Arrow />}
                />
              }
              className="before:absolute before:inset-0 before:bg-black/50 before:transition-all hover:before:bg-black/30"
            />
          </div>
        ))}
      </div>
    </div>
  )
};

export default HeroMapsGrid;