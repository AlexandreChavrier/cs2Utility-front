import { ReactNode } from 'react';
import Link from 'next/link';

const buttonVariants = {
  outline: "bg-transparent text-white border-md border-white hover:bg-white/10",
  purple: "bg-primary-600 border-md border-primary-500",
  blue: "bg-blue-600 text-white border-md border-blue-500 hover:bg-blue-700",
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
  variant?: keyof typeof buttonVariants,
  size?: keyof typeof buttonSizes
}

export const DefaultButton = ({
  title,
  icon,
  href,
  onClick,
  className,
  variant,
  size
}: DefaultButtonProps) => {

  const baseClasses = "rounded-round text-neutral-white font-semibold flex flex-row items-center justify-center gap-1 cursor-pointer";
  const variantClasses = variant ? buttonVariants[variant] : '';
  const sizeClasses = size ? buttonSizes[size] : '';

  const buttonContent = (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      onClick={onClick}
    >
      {icon && (
        <div className="icon">
          {icon}
        </div>
      )}
      <span>{title}</span>
    </button>
  );

  if (href) {
    return (
      <Link href={href}>
        {buttonContent}
      </Link>
    );
  }

  return buttonContent;
}

export default DefaultButton;

