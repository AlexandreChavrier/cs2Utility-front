import { ReactNode, useEffect, useRef, useState } from "react";
import MenuIcon from "../icons/MenuIcon";
import Image from "next/image";

export interface DropdownContent {
  icon?: ReactNode | string | null,
  item: string,
}

export type DropdownMenuProps = {
  options: DropdownContent[];
  className?: string;
  icon?: ReactNode;
  href?: string;
  placeholder?: string
}


const STYLES = {
  container: "relative w-full min-w-0 text-body-xs text-neutral-white",
  trigger: "flex items-center justify-between w-full bg-neutral-800 border-md border-neutral-600 rounded-sm px-2 sm:px-3 py-2 gap-1",
  icon: "transition-transform duration-500 flex-shrink-0",
  dropdown: "absolute w-full mt-1 bg-neutral-800 border-md border-neutral-600 rounded-sm shadow-lg z-10 max-h-60 overflow-auto",
  linkWrapper: null,
  item: "flex items-center p-3 hover:bg-neutral-700 cursor-pointer transition-colors gap-2"
}

const DropdownMenu = ({
  options,
  placeholder = "Sélectionner une option"
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<DropdownContent>(options.length > 0 ? options[0] : { item: '' })

  const handleOptionClick = (option: DropdownContent) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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

  const renderIcon = (item: string, icon?: ReactNode | string | null) => {
    if (!icon) {
      return null
    }

    if (typeof icon === 'string') {
      return (
        <Image
          src={icon}
          alt={item}
          width={20}
          height={20}
        />
      )
    }
    return <div>{icon}</div>
  }

  return (
    <div ref={dropdownRef} className={STYLES.container}>
      <button
        type="button"
        className={STYLES.trigger}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {renderIcon(selectedOption.item, selectedOption.icon)}
          <span className="truncate flex-1 text-left">
            {selectedOption?.item || placeholder}
          </span>
        </div>
        <div className={`${STYLES.icon} ${isOpen ? 'rotate-180' : ''}`}>
          <MenuIcon />
        </div>
      </button>

      {isOpen && (
        <div className={STYLES.dropdown}>
          {options.map((option: DropdownContent, index: number) => (
            <div
              key={index}
              className={STYLES.item}
              onClick={() => handleOptionClick(option)}
            >
              {renderIcon(option.item, option.icon)}
              <span className=" flex-1">
                {option.item}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default DropdownMenu;