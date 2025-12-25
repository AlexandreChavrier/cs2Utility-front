import useActionsStore from "@/components/action/store/useActionsStore";
import useLineupsStore from "@/components/lineup/store/useLineupsStore";
import { useEffect } from "react";
import { useFilters } from "./useFilters";

interface Props {
  mapId: string | undefined;
  activeUtility: string | undefined;
}

export const useMapDataFetching = ({ mapId, activeUtility }: Props) => {
  const { filters } = useFilters();
  const { getLineups, clearLineups } = useLineupsStore();
  const { getActions, clearActions } = useActionsStore();

  useEffect(() => {
    if (mapId && activeUtility) {
      getLineups({ map: mapId, utilityType: activeUtility });
    } else if (mapId && !activeUtility) {
      clearLineups();
    }
  }, [mapId, activeUtility, getLineups, clearLineups]);

  useEffect(() => {
    if (mapId && filters.actions.length > 0) {
      getActions({ map: mapId, actionTypes: filters.actions });
    } else if (mapId && filters.actions.length === 0) {
      clearActions();
    }
  }, [mapId, filters.actions, getActions, clearActions]);
};
