import { useDictionary } from "@/utils/providers/dictionaryProvider";
import { upperFirst } from "lodash";
import Image from "next/image";
import { ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonRoundProps = {
  icon?: ReactNode;
  imageUrl?: string;
  href?: string;
  variant?: keyof typeof buttonVariants;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string; // Important pour les boutons icon-only
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

const buttonVariants = {
  outline: "bg-transparent text-white border border-white hover:bg-white/10",
  purple: "bg-primary-600 border border-primary-500",
  blue: "bg-blue-600 text-white border border-blue-500 hover:bg-blue-700",
};

const ButtonRound = ({
  icon,
  imageUrl,
  variant,
  onClick,
  disabled = false,
  ariaLabel,
  type = "button",
}: ButtonRoundProps) => {
  const dictionary = useDictionary();
  const baseClasses =
    "flex flex-row justify-center items-center w-12 h-12 rounded-full gap-1 cursor-pointer font-semibold text-neutral-white overflow-hidden transition-colors";

  // Styles d'accessibilité focus
  const focusClasses =
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-neutral-1000";

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  const variantClasses = variant ? buttonVariants[variant] : "";

  return (
    <button
      type={type}
      className={`${baseClasses} ${focusClasses} ${variantClasses} ${disabledClasses}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || upperFirst(dictionary.global.button)}
    >
      {imageUrl ? (
        <div className="relative w-full h-full">
          <Image
            alt={ariaLabel || upperFirst(dictionary.global.user)}
            src={imageUrl}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="p-3">{icon}</div>
      )}
    </button>
  );
};

export default ButtonRound;
