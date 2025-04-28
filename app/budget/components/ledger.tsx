"use client";

import { propEq } from "ramda";
import {
  Period,
  useLoading,
  usePeriods,
  usePeriodsDispatch,
} from "@/app/lib/store";
import { FormEvent } from "react";

export default function Ledger({ id }: { id: string }) {
  const periods = usePeriods();
  const dispatch = usePeriodsDispatch();
  const loading = useLoading();

  if (loading) {
    return <div>Loading... Let&apos;s put a skeleton here!</div>;
  }

  const budget: Period = periods.filter(propEq(id, "id"))[0];

  if (!budget) {
    return <div>Error</div>;
  }

  function handleInput(e: FormEvent<HTMLTextAreaElement>, id: string) {
    dispatch({
      type: "update ledger",
      ledger: (e.target as HTMLInputElement).value,
      id: id,
    });
  }

  return (
    <div className="grow flex relative">
      <textarea
        value={budget.ledger}
        onInput={(e) => handleInput(e, budget.id)}
        className="absolute h-full w-full min-h-80 p-4 pb-20 font-mono"
      ></textarea>
    </div>
  );
}
