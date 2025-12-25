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
  activeFilterId?: string | string[];
  disabled?: boolean;
}

const FilterSection = memo(
  ({ title, filters, onFilterClick, activeFilterId, disabled }: Props) => {
    const isFilterActive = (filterId: string) => {
      if (Array.isArray(activeFilterId)) {
        return activeFilterId.includes(filterId);
      }
      return activeFilterId === filterId;
    };

    return (
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold">{title}</h2>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <FilterButton
              key={`${title}-${filter.filterName}-${index}`}
              filterName={filter.filterName}
              icon={filter.icon}
              isActive={isFilterActive(filter.id || filter.filterName)}
              onClick={() => onFilterClick?.(filter.id || filter.filterName)}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default FilterSection;
