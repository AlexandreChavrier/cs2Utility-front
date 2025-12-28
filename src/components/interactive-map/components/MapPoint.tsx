import Image from "next/image";
import { memo } from "react";

interface Props {
  uuid: string;
  x: number;
  y: number;
  iconUrl: string;
  iconSize: number;
  onClick: () => void;
}

export const MapPoint = memo(
  ({ uuid, x, y, iconUrl, iconSize, onClick }: Props) => {
    return (
      <button
        key={uuid}
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center scale-75 sm:scale-85 md:scale-95 lg:scale-100 transition-transform duration-200"
        style={{
          left: `${x}%`,
          top: `${y}%`,
        }}
        onClick={onClick}
      >
        <div>
          <Image src={iconUrl} width={iconSize} height={iconSize} alt="" />
        </div>
      </button>
    );
  }
);
