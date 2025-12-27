import { useState, useCallback } from "react";

export const useDisplayRadarImage = (isNuke: boolean, defaultImage: string) => {
  const [nukeView, setNukeView] = useState(false);

  const toggleNukeView = useCallback(() => {
    setNukeView((prev) => !prev);
  }, []);

  const displayImage = isNuke
    ? nukeView
      ? "/assets/maps/nuke/radar-down.webp"
      : "/assets/maps/nuke/radar-up.webp"
    : defaultImage;

  return { nukeView, toggleNukeView, displayImage };
};
