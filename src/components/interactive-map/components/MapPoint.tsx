import Image from "next/image";
import { memo } from "react";

interface Props {
  uuid: string;
  x: number;
  y: number;
  iconUrl: string;
  iconSize: number;
  onClick: () => void;
  ariaLabel: string;
  isSelected?: boolean;
}

const MapPoint = memo(
  ({
    uuid,
    x,
    y,
    iconUrl,
    iconSize,
    onClick,
    ariaLabel,
    isSelected,
  }: Props) => {
    return (
      <button
        key={uuid}
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center scale-50 sm:scale-75 md:scale-90 lg:scale-95 xl:scale-100 transition-transform duration-200"
        style={{
          left: `${x}%`,
          top: `${y}%`,
        }}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-current={isSelected ? "true" : undefined}
      >
        <div>
          <Image
            src={iconUrl}
            width={iconSize}
            height={iconSize}
            alt=""
            aria-hidden="true"
          />
        </div>
      </button>
    );
  }
);

MapPoint.displayName = "MapPoint";

export default MapPoint;
