import { useState, useEffect, SetStateAction, Dispatch } from "react";

export type Period = {
  ledger: string;
  budget: Budget;
  id: string;
};

export type Budget = Record<string, number>;

export type Store = {
  periods: Period[];
  addPeriod: () => void;
  removePeriod: (arg0: Period) => void;
  updatePeriod: (arg0: Period) => void;
  loading: boolean;
};

export function useStore(): Store {
  const empty: Period[] = [];
  const [periods, setPeriods] = useState(empty);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storage = localStorage.getItem("store");
    if (storage) {
      setPeriods(JSON.parse(storage).periods);
    }
    setLoading(false);
  }, []);

  function addPeriod() {}
  function removePeriod() {}
  function updatePeriod() {}

  return { periods, addPeriod, removePeriod, updatePeriod, loading };
}
