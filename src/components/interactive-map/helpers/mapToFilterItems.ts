import { FilterItem } from "../components/FilterSection";

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
