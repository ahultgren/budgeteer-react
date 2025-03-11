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

export type StoreType = {
  store: Store;
  setStore: Dispatch<SetStateAction<Store>>;
  loading: boolean;
};

export function useStore(): StoreType {
  const empty: Store = { periods: [] };
  const [store, setStore] = useState(empty);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storage = localStorage.getItem("store");
    if (storage) {
      setStore(JSON.parse(storage));
    }
    setLoading(false);
  }, []);

  return { store, setStore, loading };
}
