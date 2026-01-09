import Image from "next/image";
import useAuthStore from "../auth/store/useAuthStore";
import { useRef, useState } from "react";
import useClickOutside from "@/utils/hooks/useHandleClickOutside";
import MenuIcon from "../ui/icons/MenuIcon";
import { upperFirst } from "lodash";
import { useDictionary } from "@/utils/providers/dictionaryProvider";
import Link from "next/link";

export const UserBadge = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isAuthModaleOpen, setIsAuthModaleOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dictionary = useDictionary();
  const { logout } = useAuthStore();
  useClickOutside(dropdownRef, () => setIsOpen(false), "mousedown");

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="flex items-center justify-between w-full text-sm text-neutral-white bg-transparent cursor-pointer transition-all gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src="/assets/default-user.jpg"
          alt="User Avatar"
          width={42}
          height={42}
          className="object-cover rounded-full"
        />
        <MenuIcon />
      </button>
      {isOpen && (
        <div className="absolute min-w-[150px] min-h-[40px] left-0 mt-1 z-10 bg-neutral-1000 border-2 border-neutral-800 rounded-md">
          <div className="flex flex-col p-2">
            <Link
              href=""
              className="p-1 text-body-sm text-neutral-300 hover:text-primary-300 transition-colors duration-300"
            >
              {upperFirst(dictionary.header.profile)}
            </Link>
            <Link
              href=""
              className="p-1 text-body-sm text-neutral-300 hover:text-primary-300 transition-colors duration-300"
            >
              {upperFirst(dictionary.header.like)}
            </Link>
            <button
              className="p-1 text-left text-body-sm text-neutral-300 hover:text-primary-300 transition-colors duration-300"
              onClick={() => logout()}
            >
              {upperFirst(dictionary.header.logout)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
