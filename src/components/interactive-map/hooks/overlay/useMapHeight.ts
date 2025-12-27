import { useEffect, useRef, useState } from "react";

export const useMapHeight = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapHeight, setMapHeight] = useState(0);

  useEffect(() => {
    if (!mapRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setMapHeight(entry.contentRect.height);
      }
    });
    observer.observe(mapRef.current);
    return () => observer.disconnect();
  }, []);

  return { mapRef, mapHeight };
};
