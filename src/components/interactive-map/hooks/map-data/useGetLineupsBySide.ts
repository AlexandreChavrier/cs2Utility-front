import useLineupsStore from "@/components/store/useLineupsStore";
import { useMemo } from "react";
import { useFilters } from "../filters/useFilters";

export const useGetLineupsBySide = () => {
  const { lineups } = useLineupsStore();
  const { filters } = useFilters();

  const lineupsBySide = useMemo(() => {
    if (filters.side && filters.side !== "any") {
      return Object.values(lineups).filter(
        (lineup) => lineup.side === filters.side
      );
    }
    return Object.values(lineups);
  }, [lineups, filters.side]);

  return { lineupsBySide };
};
