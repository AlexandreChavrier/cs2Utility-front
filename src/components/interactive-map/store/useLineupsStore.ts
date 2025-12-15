import { Actions } from "@/data/enums/actions.enum";
import { Utilities } from "@/data/enums/utilities.enum";
import apiClient from "@/lib/apiClient/axios";
import { LineupResponse } from "@/lib/cs2utilityApi/apiResponses";
import { ApiRoutes } from "@/lib/cs2utilityApi/apiRoutes";
import { createAppStore } from "@/lib/store/createAppStore";

export type Lineup = LineupResponse;

type LineupState = {
  lineups: Lineup[];
  isFetching: boolean;
  hasError: boolean;
};

const initialState: LineupState = {
  lineups: [],
  isFetching: false,
  hasError: false,
};

type LineupActions = {
  getLineups: ({
    map,
    type,
  }: {
    map: string;
    type: Utilities;
  }) => Promise<void>;
};

export type LineupsStore = LineupState & LineupActions;

const useLineupsStore = createAppStore<LineupsStore>("lineups", (set, get) => ({
  ...initialState,
  async getLineups({ map, type }) {
    try {
      set({ isFetching: true, hasError: false });

      const response = await apiClient.get<Lineup[]>(ApiRoutes.LINEUPS, {
        params: {
          map: map,
          type: type,
        },
      });

      const lineups = response.data;

      set({
        isFetching: false,
        hasError: false,
        lineups: lineups,
      });
    } catch (error) {
      console.error(error);
      set({ isFetching: false, hasError: true });
    }
  },
}));

export default useLineupsStore;
