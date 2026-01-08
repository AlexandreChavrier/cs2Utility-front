import { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";

const buttonVariants = {
  outline: "bg-transparent text-white border border-white hover:bg-white/10",
  purple: "bg-primary-600 border border-primary-500",
  blue: "bg-blue-600 text-white border border-blue-500 hover:bg-blue-700",
};

const buttonSizes = {
  sm: "text-body-sm px-4 py-1.5",
  md: "text-body-md px-6 py-2",
  xs: "text-body-xs px-8 py-2.5",
};

export type DefaultButtonProps = {
  title?: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  disabled?: boolean;
  ariaLabel?: string; // Pour les boutons icon-only
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export const DefaultButton = ({
  title,
  icon,
  href,
  onClick,
  className = "",
  variant,
  size,
  disabled = false,
  ariaLabel,
  type = "button",
}: DefaultButtonProps) => {
  const baseClasses =
    "rounded-round text-neutral-white font-semibold flex flex-row items-center justify-center gap-1 cursor-pointer transition-colors";

  // Styles d'accessibilité focus
  const focusClasses =
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-neutral-1000";

  // Styles disabled
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const variantClasses = variant ? buttonVariants[variant] : "";
  const sizeClasses = size ? buttonSizes[size] : "";

  const combinedClasses = `${baseClasses} ${focusClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`;

  // Contenu partagé
  const content = (
    <>
      {icon && (
        <span className="icon" aria-hidden={!!title}>
          {icon}
        </span>
      )}
      {title && <span>{title}</span>}
    </>
  );

  // Si c'est un lien, on utilise Link (sémantiquement correct)
  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={combinedClasses}
        aria-label={ariaLabel || title}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  // Sinon c'est un button (sémantiquement correct)
  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || (icon && !title ? "Button" : undefined)}
    >
      {content}
    </button>
  );
};

export default DefaultButton;
