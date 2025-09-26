'use client';

import useClickOutside from "@/utils/hooks/useHandleClickOutside";
import { useEffect, useRef, useState } from "react";

interface AuthentificationModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AuthentificationModal = ({ isOpen, onClose }: AuthentificationModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, () => { return });
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div ref={modalRef} className="relative border-2 bg-neutral-1000 border-neutral-800 rounded-md">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
            <h2>Sign In</h2>
            <form action="">
              <div>
                <label htmlFor="">
                  Email
                </label>
                <input type="email" />
              </div>
              <div>
                <label htmlFor="">
                  Password
                </label>
                <input type="password" />
              </div>
              <div>
                <span>Don't have an account yet ? <a href="">Register here...</a></span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );

}

export default AuthentificationModal;