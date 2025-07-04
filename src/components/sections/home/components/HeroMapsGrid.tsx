import React from "react";
import { maps } from "@/data/maps";
import MapCard from "@/components/ui/cards/MapCard";
import ButtonRound from "@/components/ui/buttons/ButtonRound";
import Arrow from "@/components/ui/icons/Arrow";

const STYLES = {
  container: "w-full px-4 md:px-6 lg:px-8",
  wrapper: "flex flex-col max-w-[1440px] mx-auto mt-16 gap-8 p-8 bg-primary-1000 border-md border-neutral-800 rounded-lg",
  topGrid: "w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",
  bottomGrid: "w-full grid grid-cols-1 sm:grid-cols-3 gap-8",
  topCardWrapper: "aspect-square",
  bottomCardWrapper: "aspect-square sm:aspect-[4/3]",
  cardOverlay: "before:absolute before:inset-0 before:bg-[rgba(8,15,40,0.5)] before:transition-all before:duration-300 hover:before:bg-[rgba(8,15,40,0.3)]"
};

const HeroMapsGrid = () => {
  const topRowMaps = maps.slice(0, 4);
  const bottomRowMaps = maps.slice(4);

  return (
    <div className={STYLES.container}>
      <div className={STYLES.wrapper}>
        <div className={STYLES.topGrid}>
          {topRowMaps.map(map => (
            <div className={STYLES.topCardWrapper} key={map.id}>
              <MapCard
                href={map.link}
                image={map.image}
                title={map.name}
                icon={<ButtonRound
                  variant="purple"
                  icon={<Arrow />}
                />}
                className={STYLES.cardOverlay}
              />
            </div>
          ))}
        </div>
        <div className={STYLES.bottomGrid}>
          {bottomRowMaps.map(map => (
            <div className={STYLES.bottomCardWrapper} key={map.id}>
              <MapCard
                href={map.link}
                image={map.image}
                title={map.name}
                icon={<ButtonRound
                  variant="purple"
                  icon={<Arrow />}
                />}
                className={STYLES.cardOverlay}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroMapsGrid;

