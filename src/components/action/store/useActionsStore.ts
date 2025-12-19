import { Actions } from "@/data/action/actions.enum";
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
  isFetching: boolean;
  hasError: boolean;
};

const initialState: ActionState = {
  actions: [],
  actionTypes: [],
  isFetching: false,
  hasError: false,
};

type ActionActions = {
  getActionTypes: () => Promise<void>;
  getActions: ({
    map,
    actionType,
  }: {
    map: string;
    actionType: Actions;
  }) => Promise<void>;
};

export type ActionsStore = ActionState & ActionActions;

const useActionsStore = createAppStore<ActionsStore>("actions", (set, get) => ({
  ...initialState,
  async getActions({ map, actionType }) {
    try {
      set({ isFetching: true, hasError: false });

      const response = await apiClient.get<Action[]>(ApiRoutes.ACTIONS, {
        params: {
          map: map,
          actionType: actionType,
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

      set({
        isFetching: false,
        hasError: false,
        actionTypes: actionTypes,
      });
    } catch (error) {
      console.error(error);
      set({ isFetching: false, hasError: true });
    }
  },
}));

export default useActionsStore;
