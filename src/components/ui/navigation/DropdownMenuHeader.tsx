import { ReactNode, useRef, useState } from "react";
import MenuIcon from "../icons/MenuIcon";
import Image from "next/image";
import Link from "next/link";
import useClickOutside from "@/utils/hooks/useHandleClickOutside";
import useMapsStore from "@/components/map/store/useMapsStore";

export type DropdownMenuProps = {
  className?: string;
  icon?: ReactNode;
  href?: string;
};
const DropdownMenuHeader = ({}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { maps } = useMapsStore();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useClickOutside(dropdownRef, () => setIsOpen(false), "mousedown");

  return (
    <div ref={dropdownRef} className="relative min-w-[90px]">
      <button
        type="button"
        className="flex items-center justify-between w-full text-sm text-neutral-white bg-transparent cursor-pointer transition-all gap-1"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>Toutes les cartes</span>
        <div
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <MenuIcon />
        </div>
      </button>

      {isOpen && (
        <div className="absolute min-w-40 left-1/2 -translate-x-1/2 z-10 p-2 mt-5 bg-neutral-1000 border-2 border-neutral-800 rounded-md">
          {maps.map((map, index) => (
            <Link
              key={index}
              href={`/${map.id}`}
              className="w-full"
              onClick={closeDropdown}
            >
              <div className="flex items-center p-2 text-neutral-white gap-2 mb-2 rounded-sm border-2 border-transparent transition-all hover:border-neutral-700 hover:bg-neutral-600 hover:pl-4">
                {typeof map.iconUrl === "string" ? (
                  <Image
                    src={map.iconUrl}
                    alt={map.iconUrl}
                    height={24}
                    width={24}
                  />
                ) : (
                  <div>{map.iconUrl}</div>
                )}
                <span>{map.displayName}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenuHeader;
