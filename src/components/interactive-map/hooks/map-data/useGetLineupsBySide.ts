import useLineupsStore from "@/components/lineup/store/useLineupsStore";
import { useMemo } from "react";
import { useFilters } from "../filters/useFilters";

export const useGetLineupsBySide = () => {
  const { lineups } = useLineupsStore();
  const { filters } = useFilters();

  const lineupsBySide = useMemo(() => {
    if (filters.side && filters.side !== "any") {
      return lineups.filter((lineup) => lineup.side === filters.side);
    }
    return lineups;
  }, [lineups, filters.side]);

  return { lineupsBySide };
};
