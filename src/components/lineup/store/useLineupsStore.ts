import apiClient from "@/lib/apiClient/axios";
import {
  DestinationPoint,
  LineupResponse,
} from "@/lib/cs2utilityApi/apiResponses";
import { ApiRoutes } from "@/lib/cs2utilityApi/apiRoutes";
import { createAppStore } from "@/lib/store/createAppStore";

export type Lineup = LineupResponse;

type LineupState = {
  lineups: Lineup[];
  destinationPoints: DestinationPoint[];
  isFetching: boolean;
  hasError: boolean;
};

const initialState: LineupState = {
  lineups: [],
  destinationPoints: [],
  isFetching: false,
  hasError: false,
};

type LineupActions = {
  getLineups: ({
    map,
    utilityType,
  }: {
    map: string;
    utilityType: string;
  }) => Promise<void>;
  clearLineups: () => Promise<void>;
};

export type LineupsStore = LineupState & LineupActions;

const useLineupsStore = createAppStore<LineupsStore>("lineups", (set) => ({
  ...initialState,
  async getLineups({ map, utilityType }) {
    try {
      set({ isFetching: true, hasError: false });

      const response = await apiClient.get<Lineup[]>(ApiRoutes.LINEUPS, {
        params: {
          map,
          type: utilityType,
        },
      });

      const lineups = response.data;

      const destinationsMap = new Map<string, DestinationPoint>();
      lineups.forEach((lineup) => {
        if (!destinationsMap.has(lineup.destinationPoint.uuid)) {
          destinationsMap.set(
            lineup.destinationPoint.uuid,
            lineup.destinationPoint
          );
        }
      });

      const destinationsPoints = Array.from(destinationsMap.values());

      set({
        isFetching: false,
        hasError: false,
        lineups: lineups,
        destinationPoints: destinationsPoints,
      });
    } catch (error) {
      console.error(error);
      set({ isFetching: false, hasError: true });
    }
  },

  async clearLineups() {
    set({
      lineups: [],
      destinationPoints: [],
      hasError: false,
    });
  },
}));

export default useLineupsStore;
