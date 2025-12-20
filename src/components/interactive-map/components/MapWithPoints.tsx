"use client";

import useLineupsStore from "@/components/lineup/store/useLineupsStore";
import FilterButton from "@/components/ui/buttons/FilterButton";
import { DestinationPoint } from "@/lib/cs2utilityApi/apiResponses";
import Image from "next/image";

export type LineupPoint = {
  uuid: string;
  image: string;
  throwFromX: number;
  throwFromY: number;
};

interface Props {
  mapImgUrl: string;
  isNuke: boolean;
  nukeView: boolean;
  onToggleNukeView?: () => void;
  destinationPoints: DestinationPoint[];
  onDestinationClick?: () => void;
  lineupPoints?: LineupPoint[];
}

const MapWithPoints = ({
  mapImgUrl,
  isNuke,
  nukeView,
  onToggleNukeView,
  destinationPoints = [],
  onDestinationClick,
  lineupPoints = [],
}: Props) => {
  const { getLineups } = useLineupsStore();
  console.log("%cMapWithPoints RENDER", "color: #ff00ea");

  return (
    <div className="relative w-full aspect-[4/3]">
      {isNuke && (
        <div className="relative z-20">
          <FilterButton
            onClick={onToggleNukeView}
            filterName={nukeView ? "Down" : "Up"}
          />
        </div>
      )}
      <Image
        src={mapImgUrl}
        alt={""}
        fill
        priority
        className="object-contain"
      />

      <div className="absolute inset-0">
        {destinationPoints.map((point) => {
          return (
            <div
              key={point.uuid}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
              }}
            >
              <div>
                <Image
                  src={point.iconUrl ?? ""}
                  width={35}
                  height={35}
                  alt=""
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MapWithPoints;
