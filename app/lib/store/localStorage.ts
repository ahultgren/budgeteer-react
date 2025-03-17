/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

type Args<Target> = {
  key: string;
  target: Target;
  onLoad: (arg0: Target) => void;
};

type UseLocalStorage = <Target>(arg0: Args<Target>) => void;

export const useLocalStorage: UseLocalStorage = <Target>(
  args: Args<Target>
) => {
  const { key, target, onLoad } = args;
  useEffect(() => {
    const storage = localStorage.getItem(key);
    onLoad(storage ? JSON.parse(storage) : null);
  }, []);

  useEffect(() => {
    // TODO: debounce
    localStorage.setItem(key, JSON.stringify(target));
  }, [target]);
};
