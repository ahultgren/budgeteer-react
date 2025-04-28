"use client";

import {
  useState,
  createContext,
  useReducer,
  ReactNode,
  useContext,
} from "react";
import { useLocalStorage } from "./localStorage";
import { Action, periodsReducer } from "./reducer";
import { Period } from "./definitions";
import { generateExample } from "./example";

const PeriodsContext = createContext<Period[]>([]);
const PeriodsDispatchContext = createContext<(arg0: Action) => void>(() => {});
const LoadingContext = createContext(true);

export type { Period };

export function usePeriods() {
  return useContext(PeriodsContext);
}

export function usePeriodsDispatch() {
  return useContext(PeriodsDispatchContext);
}

export function useLoading() {
  return useContext(LoadingContext);
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const empty: Period[] = [];
  const [loading, setLoading] = useState(true);
  const [periods, dispatch] = useReducer(periodsReducer, empty);

  useLocalStorage({
    key: "periods",
    target: periods,
    onLoad: (data) => {
      dispatch({
        type: "loaded",
        periods: data || generateExample(),
      });

      setLoading(false);
    },
  });

  return (
    <LoadingContext.Provider value={loading}>
      <PeriodsContext value={periods}>
        <PeriodsDispatchContext value={dispatch}>
          {children}
        </PeriodsDispatchContext>
      </PeriodsContext>
    </LoadingContext.Provider>
  );
}
