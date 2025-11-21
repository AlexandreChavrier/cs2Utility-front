'use client';
import Link from 'next/link';
import Image from 'next/image';
import DefaultButton from '@/components/ui/buttons/DefaultButton';
import DropdownMenuHeader from '../ui/navigation/DropdownMenuHeader';
import SteamIcon from '../ui/icons/SteamIcon';
import HeartIcon from '../ui/icons/HeartIcon';
import SunIcon from '../ui/icons/SunIcon';
import { maps } from '@/data/maps';
import { useState } from 'react';
import AuthentificationModal from '../auth/AuthentificationModal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <header className="relative z-[999] w-full top-0 w-full py-6 font-semibold backdrop-blur bg-neutral-900">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-6">

            <Link href="/" className="flex-shrink-0">
              <Image src="/assets/logo.png" alt="logo" width={56} height={56} />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <DropdownMenuHeader
                options={maps}
              />
              <Link href='/lineups' className="text-body-sm text-neutral-white hover:text-primary-300 transition-colors duration-300">Lineups populaires</Link>
              <Link href='' className="text-body-sm text-neutral-white hover:text-primary-300 transition-colors duration-300">Actualité</Link>
            </div>

            <div className="flex items-center gap-4">
              <DefaultButton
                onClick={openModal}
                title='Se connecter'
                variant='purple'
                size='md'
              />
              <Link href=''>
                <div className=''>
                  <HeartIcon />
                </div>
              </Link>
              <Link href=''>
                <div>
                  <SunIcon />
                </div>
              </Link>
            </div>
          </nav>
        </div>

      </header>
      <AuthentificationModal
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default Header;