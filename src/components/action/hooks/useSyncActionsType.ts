"use client";

import { useEffect } from "react";
import useActionsStore from "../store/useActionsStore";

export function useSyncActionsType() {
  const { getActionTypes, isFetching, actionTypes } = useActionsStore();

  useEffect(() => {
    if (!isFetching && actionTypes.length === 0) {
      getActionTypes();
    }
  }, []);
}
