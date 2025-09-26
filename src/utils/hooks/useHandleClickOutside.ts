import { useEffect, RefObject, useCallback } from "react";

const useClickOutside = (
  ref: RefObject<HTMLElement | null>, 
  callback: () => void,
  eventType: string = 'mousedown',
) => {
  const stableCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        stableCallback();
      }
    };

    document.addEventListener(eventType, handleClickOutside);

    return () => {
      document.removeEventListener(eventType, handleClickOutside);
    };
  }, [ref, stableCallback, eventType]);
};

export default useClickOutside;