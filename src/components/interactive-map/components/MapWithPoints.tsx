"use client";

import FilterButton from "@/components/ui/buttons/FilterButton";
import Arrow from "@/components/ui/icons/Arrow";
import {
  DestinationPoint,
  LineupResponse,
} from "@/lib/cs2utilityApi/apiResponses";
import Image from "next/image";
import { memo, useRef, useState } from "react";
import { useSelectedDestination } from "../hooks/map-data/useSelectedDestination";
import { Side } from "@/data/side/side.enum";

interface Props {
  mapImgUrl: string;
  isNuke: boolean;
  nukeView: boolean;
  onToggleNukeView?: () => void;
  destinationPoints: DestinationPoint[];
  selectedDestinationId?: string;
  onDestinationClick?: (destinationPointId: string) => void;
  onBackClick?: () => void;
  lineupPoints?: LineupResponse[];
}

const MapWithPoints = memo(
  ({
    mapImgUrl,
    isNuke,
    nukeView,
    selectedDestinationId,
    onToggleNukeView,
    destinationPoints = [],
    onDestinationClick,
    onBackClick,
    lineupPoints = [],
  }: Props) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const imgRef = useRef<HTMLImageElement>(null);

    // ✅ Handler pour récupérer les coordonnées au clic
    const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!imgRef.current) return;

      const rect = imgRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // Copie dans le clipboard
      const coords = `x: ${x.toFixed(2)}, y: ${y.toFixed(2)}`;
      navigator.clipboard.writeText(coords);

      console.log(
        `%c📍 Coordonnées copiées: ${coords}`,
        "color: #00ff00; font-size: 16px; font-weight: bold"
      );
      console.log(`JSON: { x: ${x.toFixed(2)}, y: ${y.toFixed(2)} }`);
    };

    // ✅ Handler pour afficher les coordonnées au survol
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!imgRef.current) return;

      const rect = imgRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setMousePos({ x, y });
    };

    const selectedDestination = destinationPoints.find(
      (p) => p.uuid === selectedDestinationId
    );

    return (
      <div
        className="relative w-full aspect-[4/3]"
        onClick={handleMapClick} // ← AJOUT ICI
        onMouseMove={handleMouseMove} // ← AJOUT ICI
        style={{ cursor: "crosshair" }}
      >
        {true && (
          <div className="absolute top-2 left-2 bg-black/80 text-green-400 px-3 py-2 rounded font-mono text-sm z-50">
            x: {mousePos.x.toFixed(2)}% | y: {mousePos.y.toFixed(2)}%
            <div className="text-xs text-neutral-400 mt-1">
              Cliquez pour copier
            </div>
          </div>
        )}
        {selectedDestinationId && (
          <button className="relative z-20" onClick={onBackClick}>
            <Image
              src="/assets/arrow.png"
              alt="Retour"
              width={34}
              height={34}
            />
          </button>
        )}
        {isNuke && (
          <div className="relative z-20">
            <FilterButton
              isActive={nukeView}
              onClick={onToggleNukeView}
              filterName={nukeView ? "Down" : "Up"}
            />
          </div>
        )}
        <Image
          ref={imgRef}
          src={mapImgUrl}
          alt={""}
          fill
          priority
          className="object-contain"
        />

        {selectedDestination && lineupPoints.length > 0 && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {lineupPoints.map((lineup) => {
              const points = [
                { x: lineup.throwFromX, y: lineup.throwFromY },
                ...(lineup.intermediatePoints?.map((point) => ({
                  x: point.x,
                  y: point.y,
                })) ?? []),
                { x: selectedDestination.x, y: selectedDestination.y },
              ];

              const pointsString = points
                .map((point) => `${point.x},${point.y}`)
                .join(" ");
              return (
                <polyline
                  key={`line-${lineup.uuid}`}
                  points={pointsString}
                  stroke={lineup.side === "t" ? "#D6C68A" : "#9CA3AF"}
                  strokeWidth="0.2"
                  strokeDasharray="1.2"
                  opacity="0.6"
                  fill="none"
                />
              );
            })}
          </svg>
        )}

        <div className="absolute inset-0">
          {destinationPoints.map((point) => {
            return (
              <button
                key={point.uuid}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center scale-75 sm:scale-85 md:scale-95 lg:scale-100 transition-transform duration-200"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                }}
                onClick={() => {
                  if (lineupPoints.length > 0) {
                    onBackClick?.();
                  } else {
                    onDestinationClick?.(point.uuid);
                  }
                }}
              >
                <div>
                  <Image
                    src={point.iconUrl ?? ""}
                    width={38}
                    height={38}
                    alt=""
                  />
                </div>
              </button>
            );
          })}
          {lineupPoints.map((point) => {
            return (
              <button
                key={point.uuid}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center scale-75 sm:scale-85 md:scale-95 lg:scale-100 transition-transform duration-200"
                style={{
                  left: `${point.throwFromX}%`,
                  top: `${point.throwFromY}%`,
                }}
              >
                <div>
                  <Image
                    src={point.iconUrl ?? ""}
                    width={24}
                    height={24}
                    alt=""
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

export default MapWithPoints;
