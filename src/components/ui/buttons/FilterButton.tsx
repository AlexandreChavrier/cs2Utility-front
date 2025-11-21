import { ReactNode, useEffect, useRef, useState } from "react";
import MenuIcon from "../icons/MenuIcon";
import { renderIcon } from "@/utils/functions/renderIcon";

interface Props {
  filterName: string;
  icon: string | ReactNode;
  onClick?: () => void;
}

const FilterButton = ({ filterName, icon, onClick }: Props) => {
  return (
    <div className="relative min-w-0 text-body-xs text-neutral-white">
      <button
        type="button"
        className="flex items-center justify-between bg-neutral-800 border-md border-neutral-600 rounded-sm px-2 sm:px-3 py-2 gap-1"
        onClick={onClick}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {renderIcon(filterName, icon)}
          <span className="truncate flex-1 text-left">{filterName}</span>
        </div>
      </button>
    </div>
  );
};

export default FilterButton;
