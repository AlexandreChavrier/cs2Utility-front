import { useCallback, useState } from "react";

export const useSelectedDestination = () => {
  const [selectedDestinationPointId, setSelectedDestinationPointId] = useState<
    string | null
  >(null);

  const selectDestination = useCallback((destinationPointId: string) => {
    setSelectedDestinationPointId(destinationPointId);
  }, []);

  const clearSelectedDestination = useCallback(() => {
    setSelectedDestinationPointId(null);
  }, []);

  return {
    selectedDestinationPointId,
    selectDestination,
    clearSelectedDestination,
  };
};
