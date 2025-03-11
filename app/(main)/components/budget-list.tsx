"use client";

import { useStore } from "@/app/lib/data";
import { totalBudget, totalSpent } from "@/app/lib/ledger";

const title = ({ ledger }: { ledger: string }) => {
  return ledger.split("\n")[0];
};

export default function BudgetList() {
  const [store, setStore] = useStore();

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {store.periods.map((budget) => (
        <li key={budget.id} className="flex justify-between py-3">
          <div className="min-w-0 flex-auto">
            <p className="text-sm/6 font-semibold text-gray-900">
              {title(budget)}
            </p>
            <p className="text-sm text-gray-500">
              {totalSpent(budget)} / {totalBudget(budget)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
