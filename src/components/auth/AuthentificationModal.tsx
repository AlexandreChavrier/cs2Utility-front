"use client";

import useClickOutside from "@/utils/hooks/useHandleClickOutside";
import React, { useRef, useState } from "react";
import useAuthStore from "./store/useAuthStore";

interface AuthentificationModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AuthentificationModal = ({
  isOpen,
  onClose,
}: AuthentificationModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email: email, password: password });
    onClose?.();
  };

  useClickOutside(modalRef, () => {
    return;
  });

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />
          <div
            ref={modalRef}
            className="relative w-full max-w-md bg-neutral-1000 border-2 border-neutral-800 rounded-lg shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors text-2xl font-bold z-10"
            >
              ×
            </button>

            {/* Header */}
            <div className="px-8 pt-8 pb-6 border-b border-neutral-800">
              <h2 className="text-2xl font-bold text-white">Sign In</h2>
              <p className="text-neutral-400 text-sm mt-1">
                Welcome back! Please enter your details.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="flex items-center justify-end">
                <a
                  href="#"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-1000"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

              <div className="text-center pt-4 border-t border-neutral-800">
                <span className="text-neutral-400 text-sm">
                  Don&apos;t have an account yet?{" "}
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Register here
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthentificationModal;
