import { useState, useEffect, SetStateAction, Dispatch } from "react";

export type Store = {
  periods: Period[];
};

export type Period = {
  ledger: string;
  budget: Budget;
  id: string;
};

export type Budget = Record<string, number>;

export function useStore(): [Store, Dispatch<SetStateAction<Store>>] {
  const empty: Store = { periods: [] };
  const [store, setStore] = useState(empty);

  useEffect(() => {
    const storage = localStorage.getItem("store");
    if (storage) {
      setStore(JSON.parse(storage));
    }
  }, []);

  return [store, setStore];
}
