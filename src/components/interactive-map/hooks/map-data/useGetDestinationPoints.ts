import { useFilters } from "../filters/useFilters";
import { useMemo } from "react";
import useActionsStore from "@/components/store/useActionsStore";
import { DestinationPoint } from "@/lib/cs2utilityApi/apiResponses";
import { useGetLineupsBySide } from "./useGetLineupsBySide";

export const useGetDestinationPoints = ({
  activeUtility,
}: {
  activeUtility: string | undefined;
}) => {
  const { lineupsBySide } = useGetLineupsBySide();
  const { actions } = useActionsStore();
  const { filters } = useFilters();

  const destinationPoints = useMemo(() => {
    let points: DestinationPoint[] = [];

    if (activeUtility && lineupsBySide.length > 0) {
      points = lineupsBySide.map((lineup) => lineup.destinationPoint);
    }
    if (filters.actions.length > 0 && actions.length > 0) {
      points = [...points, ...actions.map((action) => action.destinationPoint)];
    }

    const uniqueMap = new Map(points.map((point) => [point.uuid, point]));
    return Array.from(uniqueMap.values());
  }, [actions, lineupsBySide, filters.actions, activeUtility]);

  return { destinationPoints };
};
