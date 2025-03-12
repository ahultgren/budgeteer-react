"use client";

import { currentCategories, totalBudget, totalSpent } from "@/app/lib/ledger";
import { Period, useLoading, usePeriods } from "@/app/lib/store";
import { propEq } from "ramda";
import { Usable, use } from "react";

export default function Summary(props: { params: Usable<{ id: string }> }) {
  const params = use(props.params);
  const id = params.id;
  const loading = useLoading();
  const periods = usePeriods();

  if (loading) {
    return <div>Loading... Let's put a skeleton here!</div>;
  }

  const budget: Period = periods.filter(propEq(id, "id"))[0];
  const categories = currentCategories(budget);

  return (
    <div className="grow flex flex-col relative font-mono px-4 py-3">
      {categories.map((c) => (
        <div key={c.name} className="flex py-1 line-h">
          <span className="grow">{c.name}</span>
          <span className="">{c.amount}</span>
          <span className="px-2">/</span>
          <span className="w-12">{c.budget}</span>
        </div>
      ))}
      <div className="flex py-3 my-2 line-h border-t">
        <span className="grow">Total:</span>
        <span className="">{totalSpent(budget)}</span>
        <span className="px-2">/</span>
        <span className="w-12">{totalBudget(budget)}</span>
      </div>
    </div>
  );
}
