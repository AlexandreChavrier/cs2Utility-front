import { ReactNode } from "react";

export type ButtonRoundProps = {
  icon?: ReactNode;
  href?: string;
  variant?: keyof typeof buttonVariants;
}

const buttonVariants = {
  outline: "bg-transparent text-white border-md border-white hover:bg-white/10",
  purple: "bg-primary-600 border-md border-primary-500",
  blue: "bg-blue-600 text-white border-md border-blue-500 hover:bg-blue-700",
};

const ButtonRound = ({ icon, variant }: ButtonRoundProps) => {
  const baseClasses = "flex flex-row justify-center items-center w-12 h-12 p-3 border-borderWidth-md rounded-round gap-1 cursor-pointer font-semibold text-neutral-white";
  const variantClasses = variant ? buttonVariants[variant] : '';

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      {icon}
    </div>
  )
}

export default ButtonRound;