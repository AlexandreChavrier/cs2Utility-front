import { useMemo } from "react";
import { useGetLineupsBySide } from "./useGetLineupsBySide";

export const useGetLineupPoints = ({
  destinationPointId,
}: {
  destinationPointId: string | null;
}) => {
  const { lineupsBySide } = useGetLineupsBySide();

  const lineupPoints = useMemo(() => {
    if (!destinationPointId) return [];

    return lineupsBySide.filter(
      (lineup) => lineup.destinationPoint.uuid === destinationPointId
    );
  }, [lineupsBySide, destinationPointId]);
  return { lineupPoints };
};
