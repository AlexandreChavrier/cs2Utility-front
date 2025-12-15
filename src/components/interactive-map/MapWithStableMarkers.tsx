"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import FilterButton from "../ui/buttons/FilterButton";
import useLineupsStore from "./store/useLineupsStore";
import { Utilities } from "@/data/enums/utilities.enum";

export type Marker = {
  id: string;
  image: string;
  x: number;
  y: number;
};

export default function MapWithStableMarkers({
  imageSrc,
  markers,
  isNuke,
  nukeView,
  onToggleNukeView,
  imageAlt = "map",
}: {
  imageSrc: string;
  markers: Marker[];
  isNuke: boolean;
  nukeView: boolean;
  onToggleNukeView: () => void;
  imageAlt?: string;
}) {
  const { getLineups } = useLineupsStore();

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
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-contain"
      />

      {/* Overlay parfaitement superposé à l'image */}
      <div className="absolute inset-0 pointer-events-none">
        {markers.map((marker) => {
          return (
            <div
              key={marker.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{
                left: `${48}%`,
                top: `${marker.y}%`,
              }}
            >
              <div>
                <Image src={marker.image} width={35} height={35} alt="" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
