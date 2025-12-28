"use client";

import Image from "next/image";

interface Props {
  mapImgUrl: string;
}

const MediaSection = ({ mapImgUrl }: Props) => {
  return (
    <div className="relative w-full aspect-[4/3]">
      <Image src={mapImgUrl} alt={""} fill className="object-cover" />
    </div>
  );
};

export default MediaSection;
