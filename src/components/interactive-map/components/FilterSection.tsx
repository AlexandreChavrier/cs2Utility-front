import { memo, ReactNode } from "react";
import FilterButton from "../../ui/buttons/FilterButton";

export type FilterItem = {
  filterName: string;
  icon: string | ReactNode;
  id?: string;
};

interface Props {
  title: string;
  filters: FilterItem[];
  onFilterClick?: (id: string) => void;
  activeFilterId?: string;
}

const FilterSection = memo(
  ({ title, filters, onFilterClick, activeFilterId }: Props) => {
    return (
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold">{title}</h2>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <FilterButton
              key={`${title}-${filter.filterName}-${index}`}
              filterName={filter.filterName}
              icon={filter.icon}
              isActive={activeFilterId === filter.id}
              onClick={() => onFilterClick?.(filter.id || filter.filterName)}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default FilterSection;
