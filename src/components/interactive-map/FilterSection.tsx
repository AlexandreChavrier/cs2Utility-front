import { ReactNode } from "react";
import FilterButton from "../ui/buttons/FilterButton";

export type FilterItem = {
  filterName: string;
  icon: string | ReactNode;
};

interface Props {
  title: string;
  filters: FilterItem[];
  onFilterClick?: (filterName: string) => void;
}

const FilterSection = ({ title, filters, onFilterClick }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-base font-semibold">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <FilterButton
            key={`${title}-${filter.filterName}-${index}`}
            filterName={filter.filterName}
            icon={filter.icon}
            onClick={() => onFilterClick?.(filter.filterName)}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
