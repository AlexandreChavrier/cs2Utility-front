"use client";

import React from "react";
import RoadMap from "@/components/ui/icons/RoadMap";
import DefaultButton from "@/components/ui/buttons/DefaultButton";
import Flame from "@/components/ui/icons/Flame";
import { useDictionary } from "@/utils/providers/dictionaryProvider";
import { upperFirst } from "lodash";

const HeroContent = () => {
  const dictionary = useDictionary();
  return (
    <div className="text-center max-w-[800px]">
      <div className="flex flex-col gap-4">
        <h2>{upperFirst(dictionary.home.title)}</h2>
        <p>{upperFirst(dictionary.home.description)}</p>
      </div>

      <div className="flex justify-center gap-4">
        <DefaultButton
          title={upperFirst(dictionary.home.button.viewAllMaps)}
          icon={<RoadMap />}
          variant="purple"
          size="md"
        />
        <DefaultButton
          title={upperFirst(dictionary.home.button.viewPopularLineups)}
          icon={<Flame />}
          variant="outline"
          size="md"
        />
      </div>
    </div>
  );
};

export default HeroContent;
