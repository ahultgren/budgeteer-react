"use client";

import { useLoading, usePeriods } from "@/app/lib/store";
import { totalBudget, totalSpent } from "@/app/lib/ledger";
import Link from "next/link";

const title = ({ ledger }: { ledger: string }) => {
  return ledger.split("\n")[0];
};

export default function BudgetList() {
  const periods = usePeriods();
  const loading = useLoading();

  if (loading) {
    return <div>Loading... Let's put a skeleton here!</div>;
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {periods
        .slice(0)
        .reverse()
        .map((budget) => (
          <li key={budget.id} className="flex justify-between py-3">
            <Link href={`/budget/${budget.id}`} className="w-full">
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                  {title(budget)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {totalSpent(budget)} / {totalBudget(budget)}
                </p>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
}
