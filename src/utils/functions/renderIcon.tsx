import Image from "next/image";
import { ReactNode } from "react";

export const renderIcon = (
  label?: string,
  icon?: ReactNode | string | null
) => {
  if (!icon) return null;
  if (typeof icon === "string") {
    return (
      <Image
        src={icon}
        alt={label ?? ""}
        width={20}
        height={20}
        aria-hidden="true"
      />
    );
  }
  return <div>{icon}</div>;
};
