import { FilterItem } from "@/components/interactive-map/components/FilterSection";
import { mapToFilterItems } from "@/components/interactive-map/helpers/mapToFilterItems";
import apiClient from "@/lib/apiClient/axios";
import { MapResponse } from "@/lib/cs2utilityApi/apiResponses";
import { ApiRoutes } from "@/lib/cs2utilityApi/apiRoutes";
import { createAppStore } from "@/lib/store/createAppStore";

export type Map = MapResponse;

type MapState = {
  maps: Map[];
  mapFilters: FilterItem[]; // ← Ajoute ça
  isFetching: boolean;
  currentMapId: string | undefined;
  currentMap: Map | undefined;
  hasError: boolean;
};

const initialState: MapState = {
  maps: [],
  mapFilters: [],
  isFetching: false,
  currentMapId: undefined,
  currentMap: undefined,
  hasError: false,
};

type MapActions = {
  getActiveMaps: () => Promise<void>;
  setCurrentMapId: (mapId: string) => void;
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
        currentMap: get().currentMapId
          ? maps.find((m) => m.id === get().currentMapId)
          : undefined,
      });
    } catch (error) {
      console.error(error);
      set({ isFetching: false, hasError: true });
    }
  },
  setCurrentMapId(mapId: string) {
    const maps = get().maps;
    const currentMap = maps.find((m) => m.id === mapId);
    set({ currentMapId: mapId, currentMap });
  },
}));

export default useMapsStore;
