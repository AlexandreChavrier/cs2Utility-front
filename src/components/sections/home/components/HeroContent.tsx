import React from "react";
import RoadMap from "@/components/ui/icons/RoadMap";
import Buttons from "@/components/ui/buttons/DefaultButton";
import Flame from "@/components/ui/icons/Flame";

const HeroContent = () => {
  return (
    <div className="text-center max-w-[1440px]">
      <div className="flex flex-col gap-4">
        <h1>Deviens un expert des utilitaires avec les lineups indispensables pour CS2</h1>
        <p>
          Accède à une sélection des meilleurs lineups pour smokes, grenades, molotovs et flashs, tirés des stratégies
          des
          pros et des astuces de la communauté.
        </p>
      </div>
      <div className="flex justify-center gap-4 flex-row ">
        <Buttons
          title="Voir toutes cartes"
          icon={<RoadMap />}
          variant="purple"
          size="md"
        />
        <Buttons
          title="Voir les lineups populaires"
          icon={<Flame />}
          variant="outline"
          size="md"
        />
      </div>
    </div>
  )
}

export default HeroContent;