import useLineupsStore from "@/components/lineup/store/useLineupsStore";
import { useFilters } from "./useFilters";
import { useMemo } from "react";
import useActionsStore from "@/components/action/store/useActionsStore";

export const useFilteredMapData = ({
  activeUtility,
}: {
  activeUtility: string | undefined;
}) => {
  const { filters } = useFilters();
  const { lineups } = useLineupsStore();
  const { actions } = useActionsStore();

  const filteredLineups = useMemo(() => {
    if (!activeUtility) return [];
    if (filters.side && filters.side !== "any") {
      return lineups.filter((lineup) => lineup.side === filters.side);
    }

    return lineups;
  }, [lineups, filters.side, activeUtility]);

  const filteredActions = useMemo(() => {
    // Filtrer plus tard par side
    if (filters.actions.length === 0) return [];

    return actions;
  }, [actions, filters.actions]);

  const destinationPoints = useMemo(() => {
    if (activeUtility && filteredLineups.length > 0) {
      return filteredLineups.map((lineup) => lineup.destinationPoint);
    }
    if (filters.actions.length > 0 && filteredActions.length > 0) {
      return filteredActions.map((action) => action.destinationPoint);
    }
    return [];
  }, [filteredActions, filteredLineups, filters.actions]);

  return { filteredLineups, filteredActions, destinationPoints, filters };
};
