import { sides } from "@/data/side/sides";
import { FilterItem } from "../components/FilterSection";
import { utilities } from "@/data/utility/utilities";
import useMapsStore from "@/components/map/store/useMapsStore";
import useActionsStore from "@/components/action/store/useActionsStore";

export function mapToFilterItems<
  T extends {
    id: string;
    name?: string;
    displayName?: string;
    iconUrl: string;
  }
>(items: T[]): FilterItem[] {
  return items.map((item) => ({
    id: item.id,
    filterName: item.name || item.displayName || "",
    icon: item.iconUrl,
  }));
}

export const teamsFilters = mapToFilterItems(sides);
export const utilitiesFilters = mapToFilterItems(utilities);
