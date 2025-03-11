"use client";

import { propEq } from "ramda";
import { Period, useStore } from "@/app/lib/data";

export default function Ledger({ id }: { id: string }) {
  const { store, loading } = useStore();

  if (loading) {
    return <div>Loading... Let's put a skeleton here!</div>;
  }

  const budget: Period = store.periods.filter(propEq(id, "id"))[0];

  if (!budget) {
    return <div>Error</div>;
  }

  return (
    <div className="grow flex relative">
      <textarea
        defaultValue={budget.ledger}
        className="absolute h-full w-full min-h-80 p-4 pb-20 font-mono"
      ></textarea>
    </div>
  );
}
