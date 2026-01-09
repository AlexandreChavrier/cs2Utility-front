"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import AuthentificationModal from "../auth/AuthentificationModal";
import { useDictionary } from "@/utils/providers/dictionaryProvider";
import { upperFirst } from "lodash";
import useAuthStore from "../auth/store/useAuthStore";
import { UserBadge } from "../user/UserBadge";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const dictionary = useDictionary();
  const { isAuthenticated } = useAuthStore();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    {
      id: "dust2",
      href: "/dust2",
      label: upperFirst(dictionary.header.interactiveMap),
    },
    {
      id: "lineups",
      href: "",
      label: upperFirst(dictionary.header.popularLineups),
    },
    { id: "book", href: "", label: upperFirst(dictionary.header.book) },
  ];

  return (
    <>
      <header className="relative z-[30] w-full top-0 py-6 font-semibold backdrop-blur bg-neutral-900">
        <div className="w-full max-w-[70%] mx-auto px-4 md:px-6 lg:px-8">
          <nav
            aria-label="Main navigation"
            className="flex items-center justify-between gap-6"
          >
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/assets/logo.png"
                alt="CS2 Utility logo"
                width={56}
                height={56}
              />
            </Link>

            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-neutral-white hover:text-primary-300 transition-colors duration-300"
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <UserBadge />
              ) : (
                <button
                  className="text-body-sm text-neutral-white hover:text-primary-300 transition-colors duration-300"
                  onClick={openModal}
                >
                  {upperFirst(dictionary.header.login)}
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-neutral-white"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? (
                  // Icône X
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  // Icône Burger
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </nav>
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              id="mobile-menu"
              className="md:hidden mt-4 py-4 border-t border-neutral-800"
            >
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="block text-body-sm text-neutral-white hover:text-primary-300 transition-colors duration-300"
                      aria-current={pathname === link.href ? "page" : undefined}
                      onClick={closeMobileMenu}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>
      <AuthentificationModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Header;
