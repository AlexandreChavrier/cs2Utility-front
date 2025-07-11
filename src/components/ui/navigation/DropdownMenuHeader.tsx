import { ReactNode, useEffect, useRef, useState } from "react";
import MenuIcon from "../icons/MenuIcon";
import Image from "next/image";
import Link from "next/link";
import { GameMap } from "@/data/maps";


export type DropdownMenuProps = {
  options: GameMap[];
  className?: string;
  icon?: ReactNode;
  href?: string;
}
const DropdownMenuHeader = ({ options }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const closeDropdown = () => {
    setIsOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <MenuIcon />
        </div>
      </button>

      {isOpen && (
        <div className="absolute min-w-40 left-1/2 -translate-x-1/2 z-10 p-2 mt-5 bg-neutral-1000 border-2 border-neutral-800 rounded-md">
          {options.map((option: GameMap, index: number) => (
            <Link
              key={index}
              href={option.link ?? '#'}
              className="w-full"
              onClick={closeDropdown}
            >
              <div
                className="flex items-center p-2 text-neutral-white gap-2 mb-2 rounded-sm border-2 border-transparent transition-all hover:border-neutral-700 hover:bg-neutral-600 hover:pl-4"
              >
                {typeof option.icon === 'string' ? (
                  <Image
                    src={option.icon}
                    alt={option.name}
                    height={24}
                    width={24}
                  />
                ) : (
                  <div>
                    {option.icon}
                  </div>
                )}
                <span>{option.name}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};


export default DropdownMenuHeader;