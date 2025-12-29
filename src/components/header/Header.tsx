"use client";
import Link from "next/link";
import Image from "next/image";
import DefaultButton from "@/components/ui/buttons/DefaultButton";
import DropdownMenuHeader from "../ui/navigation/DropdownMenuHeader";
import HeartIcon from "../ui/icons/HeartIcon";
import SunIcon from "../ui/icons/SunIcon";
import { useState } from "react";
import AuthentificationModal from "../auth/AuthentificationModal";
import { useDictionary } from "@/utils/providers/dictionaryProvider";
import { upperFirst } from "lodash";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dictionary = useDictionary();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <header className="relative z-[999] w-full top-0 py-6 font-semibold backdrop-blur bg-neutral-900">
        <div className="w-full max-w-[70%] mx-auto px-4 md:px-6 lg:px-8">
          <nav className="flex items-center justify-between gap-6">
            <Link href="/" className="flex-shrink-0">
              <Image src="/assets/logo.png" alt="logo" width={56} height={56} />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {/* <DropdownMenuHeader /> */}
              <Link
                href="/dust2"
                className="text-body-sm text-neutral-white hover:text-primary-300 transition-colors duration-300"
              >
                {upperFirst(dictionary.header.interactiveMap)}
              </Link>
              <Link
                href=""
                className="text-body-sm text-neutral-white hover:text-primary-300 transition-colors duration-300"
              >
                {upperFirst(dictionary.header.popularLineups)}
              </Link>
              <Link
                href=""
                className="text-body-sm text-neutral-white hover:text-primary-300 transition-colors duration-300"
              >
                {upperFirst(dictionary.header.book)}
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <DefaultButton
                onClick={openModal}
                title={upperFirst(dictionary.header.login)}
                variant="purple"
                size="md"
              />
              <Link href="">
                <div className="">
                  <HeartIcon />
                </div>
              </Link>
              <Link href="">
                <div>
                  <SunIcon />
                </div>
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <AuthentificationModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Header;
