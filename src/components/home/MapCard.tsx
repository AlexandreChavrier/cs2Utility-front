import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

export type CardProps = {
  title?: string;
  image?: string;
  icon?: ReactNode;
  href?: string;
  className?: string;
};

const MapCard = ({
  title,
  image,
  icon,
  href = "",
  className = "",
}: CardProps) => {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-md h-full block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${className}`}
    >
      <Image
        src={image || ""}
        alt=""
        fill
        className="object-cover"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300"
        aria-hidden="true"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-white drop-shadow-lg">{title}</h3>
      </div>
    </Link>
  );
};

export default MapCard;
