import Image from "next/image";
import { ReactNode } from "react";

export type ButtonRoundProps = {
  icon?: ReactNode;
  imageUrl?: string;
  href?: string;
  variant?: keyof typeof buttonVariants;
};

const buttonVariants = {
  outline: "bg-transparent text-white border-md border-white hover:bg-white/10",
  purple: "bg-primary-600 border-md border-primary-500",
  blue: "bg-blue-600 text-white border-md border-blue-500 hover:bg-blue-700",
};

const ButtonRound = ({ icon, imageUrl, variant }: ButtonRoundProps) => {
  const baseClasses =
    "flex flex-row justify-center items-center w-12 h-12 border-borderWidth-md rounded-full gap-1 cursor-pointer font-semibold text-neutral-white overflow-hidden";
  const variantClasses = variant ? buttonVariants[variant] : "";

  return (
    <button className={`${baseClasses} ${variantClasses}`}>
      {imageUrl ? (
        <div className="relative w-full h-full">
          <Image alt="user" src={imageUrl} fill className="object-cover" />
        </div>
      ) : (
        <div className="p-3">{icon}</div>
      )}
    </button>
  );
};

export default ButtonRound;
