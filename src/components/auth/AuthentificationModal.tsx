"use client";

import useClickOutside from "@/utils/hooks/useHandleClickOutside";
import React, { useRef, useState, useEffect } from "react";
import useAuthStore from "./store/useAuthStore";
import DefaultButton from "../ui/buttons/DefaultButton";
import { upperFirst } from "lodash";
import { useDictionary } from "@/utils/providers/dictionaryProvider";

interface AuthentificationModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

type AuthMode = "signin" | "register";

const AuthentificationModal = ({
  isOpen,
  onClose,
}: AuthentificationModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const dictionary = useDictionary();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { login, register, isLoading } = useAuthStore();

  // Reset form quand on change de mode
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
  };

  // Focus automatique sur email à l'ouverture
  useEffect(() => {
    if (isOpen) {
      emailInputRef.current?.focus();
    }
  }, [isOpen]);

  // Gestion Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "signin") {
      login({ email, password });
    } else {
      register({ email, password, confirmPassword, firstName, lastName });
    }

    onClose?.();
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  };

  useClickOutside(modalRef, () => {
    onClose?.();
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="relative w-full max-w-md bg-neutral-1000 border-2 border-neutral-800 rounded-lg shadow-2xl overflow-hidden"
      >
        <button
          onClick={onClose}
          aria-label="Close authentication modal"
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors text-2xl font-bold z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        >
          ×
        </button>

        {/* Tabs */}
        <div
          className="flex border-b border-neutral-800"
          role="tablist"
          aria-label="Authentication options"
        >
          <button
            role="tab"
            aria-selected={mode === "signin"}
            aria-controls="signin-panel"
            onClick={() => switchMode("signin")}
            className={`flex-1 px-8 pt-6 pb-4 font-semibold transition-colors ${
              mode === "signin"
                ? "text-white border-b-2 border-blue-500"
                : "text-neutral-400 hover:text-neutral-300"
            }`}
          >
            Sign In
          </button>
          <button
            role="tab"
            aria-selected={mode === "register"}
            aria-controls="register-panel"
            onClick={() => switchMode("register")}
            className={`flex-1 px-8 pt-6 pb-4 font-semibold transition-colors ${
              mode === "register"
                ? "text-white border-b-2 border-blue-500"
                : "text-neutral-400 hover:text-neutral-300"
            }`}
          >
            Register
          </button>
        </div>

        {/* Header */}
        <div className="px-4 sm:px-8 pt-4 pb-2">
          <h2 id="auth-modal-title" className="text-xl font-bold text-white">
            {mode === "signin" ? "Welcome back!" : "Create an account"}
          </h2>
          <p className="text-neutral-400 text-sm mt-1">
            {mode === "signin"
              ? "Please enter your details."
              : "Fill in your information to get started."}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-4 sm:px-8 py-6 space-y-4"
          role="tabpanel"
          id={mode === "signin" ? "signin-panel" : "register-panel"}
          aria-labelledby="auth-modal-title"
        >
          {mode === "register" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-neutral-300 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    autoComplete="given-name"
                    placeholder="John"
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-neutral-300 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    autoComplete="family-name"
                    placeholder="Doe"
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-300 mb-2"
            >
              Email
            </label>
            <input
              ref={emailInputRef}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
              autoComplete={
                mode === "signin" ? "current-password" : "new-password"
              }
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>

          {mode === "register" && (
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-neutral-300 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
          )}

          {mode === "signin" && (
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-1000"
          >
            {isLoading
              ? "Loading..."
              : mode === "signin"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthentificationModal;
