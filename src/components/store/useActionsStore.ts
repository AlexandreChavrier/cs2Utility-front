import { FilterItem } from "@/components/interactive-map/components/FilterSection";
import { mapToFilterItems } from "@/components/interactive-map/helpers/mapToFilterItems";
import apiClient from "@/lib/apiClient/axios";
import {
  ActionResponse,
  ActionTypeResponse,
} from "@/lib/cs2utilityApi/apiResponses";
import { ApiRoutes } from "@/lib/cs2utilityApi/apiRoutes";
import { createAppStore } from "@/lib/store/createAppStore";

export type Action = ActionResponse;
export type ActionType = ActionTypeResponse;

type ActionState = {
  actions: Action[];
  actionTypes: ActionType[];
  actionTypeFilters: FilterItem[];
  isFetching: boolean;
  hasError: boolean;
};

const initialState: ActionState = {
  actions: [],
  actionTypes: [],
  actionTypeFilters: [],
  isFetching: false,
  hasError: false,
};

type ActionActions = {
  getActionTypes: () => Promise<void>;
  getActions: ({
    map,
    actionTypes,
  }: {
    map: string;
    actionTypes: string[];
  }) => Promise<void>;
  clearActions: () => void;
};

export type ActionsStore = ActionState & ActionActions;

const useActionsStore = createAppStore<ActionsStore>("actions", (set) => ({
  ...initialState,
  async getActions({ map, actionTypes }) {
    try {
      set({ isFetching: true, hasError: false });

      const response = await apiClient.get<Action[]>(ApiRoutes.ACTIONS, {
        params: {
          map,
          actionTypes,
        },
      });

      const actions = response.data;

      set({
        isFetching: false,
        hasError: false,
        actions: actions,
      });
    } catch (error) {
      console.error(error);
      set({ isFetching: false, hasError: true });
    }
  },

  async getActionTypes() {
    try {
      set({ isFetching: true, hasError: false });
      const response = await apiClient.get<ActionType[]>(
        ApiRoutes.ACTION_TYPES,
        {}
      );

      const actionTypes = response.data;

      const actionTypeFilters = mapToFilterItems(actionTypes);

      set({
        isFetching: false,
        hasError: false,
        actionTypes: actionTypes,
        actionTypeFilters,
      });
    } catch (error) {
      console.error(error);
      set({ isFetching: false, hasError: true });
    }
  },

  clearActions() {
    set({
      actions: [],
      isFetching: false,
      hasError: false,
    });
  },
}));

export default useActionsStore;
