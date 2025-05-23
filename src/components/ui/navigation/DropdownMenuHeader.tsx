import { ReactNode, useEffect, useRef, useState } from "react";
import MenuIcon from "../icons/MenuIcon";
import Image from "next/image";
import Link from "next/link";
import { GameMap, maps } from "@/data/maps";


export type DropdownMenuProps = {
  options: GameMap[];
  className?: string;
  icon?: ReactNode;
  href?: string;
}

const STYLES = {
  container: "relative min-w-[88px]",
  trigger: "flex items-center justify-between w-full text-xs sm:text-sm text-neutral-white border-none cursor-pointer bg-transparent transition-all duration-300 ease-in-out gap-1",
  icon: "transition-transform duration-500",
  dropdown: "absolute min-w-[160px] w-full sm:w-auto right-0 sm:right-auto z-10 p-2 mt-5 bg-neutral-900 border-2 border-neutral-800 rounded-md shadow-lg overflow-auto",
  linkWrapper: 'w-full',
  item: "flex items-center p-2 w-full text-neutral-white gap-2 border-2 border-transparent transition-all duration-300 ease-in-out mb-2 rounded-sm hover:border-neutral-700 hover:bg-neutral-600 hover:pl-4"
};

const DropdownMenuHeader = ({ options, href, className }: DropdownMenuProps) => {
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
    <div ref={dropdownRef} className={STYLES.container}>
      <button
        type="button"
        className={STYLES.trigger}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>Toutes les cartes</span>
        <div className={`${STYLES.icon} ${isOpen ? 'rotate-180' : ''}`}>
          <MenuIcon />
        </div>
      </button>

      {isOpen && (
        <div className={STYLES.dropdown}>
          {options.map((option: GameMap, index: number) => (
            <Link
              key={index}
              href={option.link ?? '#'}
              className="w-full"
              onClick={closeDropdown}
            >
              <div
                className={STYLES.item}
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