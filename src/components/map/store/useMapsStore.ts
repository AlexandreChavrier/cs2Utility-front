import { FilterItem } from "@/components/interactive-map/components/FilterSection";
import { mapToFilterItems } from "@/components/interactive-map/helpers/mapToFilterItems";
import { Actions } from "@/data/action/actions.enum";
import apiClient from "@/lib/apiClient/axios";
import { LineupResponse, MapResponse } from "@/lib/cs2utilityApi/apiResponses";
import { ApiRoutes } from "@/lib/cs2utilityApi/apiRoutes";
import { createAppStore } from "@/lib/store/createAppStore";

export type Map = MapResponse;

type MapState = {
  maps: Map[];
  mapFilters: FilterItem[]; // ← Ajoute ça
  isFetching: boolean;
  hasError: boolean;
};

const initialState: MapState = {
  maps: [],
  mapFilters: [],
  isFetching: false,
  hasError: false,
};

type MapActions = {
  getActiveMaps: () => Promise<void>;
};

export type MapsStore = MapState & MapActions;

const useMapsStore = createAppStore<MapsStore>("maps", (set, get) => ({
  ...initialState,
  async getActiveMaps() {
    try {
      set({ isFetching: true, hasError: false });

      const response = await apiClient.get<Map[]>(ApiRoutes.MAPS, {});
      const maps = response.data;

      const mapFilters = mapToFilterItems(maps);

      set({
        isFetching: false,
        hasError: false,
        maps: maps,
        mapFilters,
      });
    } catch (error) {
      console.error(error);
      set({ isFetching: false, hasError: true });
    }
  },
}));

export default useMapsStore;
