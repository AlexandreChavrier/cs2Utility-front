import { memo, ReactNode, useEffect, useRef, useState } from "react";
import MenuIcon from "../icons/MenuIcon";
import { renderIcon } from "@/utils/functions/renderIcon";

interface Props {
  filterName: string;
  icon?: string | ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

const FilterButton = memo(({ filterName, icon, onClick, isActive }: Props) => {
  return (
    <div className="relative min-w-0 text-body-xs text-neutral-white">
      <button
        type="button"
        className={`flex items-center justify-between rounded-sm px-2 sm:px-3 py-2 gap-1 transition-all
          ${
            isActive
              ? "bg-neutral-800 border border-blue-500 ring-2 ring-blue-500/30 text-blue-400"
              : "bg-neutral-800 border border-neutral-600 hover:border-neutral-500"
          }
        `}
        onClick={onClick}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {renderIcon(filterName, icon)}
          <span className="truncate flex-1 text-left">{filterName}</span>
        </div>
      </button>
    </div>
  );
});

export default FilterButton;
