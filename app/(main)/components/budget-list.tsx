"use client";

import { useLoading, usePeriods, usePeriodsDispatch } from "@/app/lib/store";
import { totalBudget, totalSpent } from "@/app/lib/ledger";
import Link from "next/link";
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { TrashIcon } from "@heroicons/react/24/outline";

const title = ({ ledger }: { ledger: string }) => {
  return ledger.split("\n")[0];
};

export default function BudgetList() {
  const periods = usePeriods();
  const dispatch = usePeriodsDispatch();
  const loading = useLoading();

  if (loading) {
    return <div>Loading... Let&apos;s put a skeleton here!</div>;
  }

  return (
    <SwipeableList className="divide-y divide-gray-100" type={Type.IOS}>
      {periods
        .slice(0)
        .reverse()
        .map((period) => (
          <SwipeableListItem
            key={period.id}
            className="flex justify-between py-3"
            trailingActions={Actions({
              remove: () =>
                dispatch({
                  type: "remove",
                  period: period,
                }),
            })}
            fullSwipe={true}
          >
            <Link href={`/budget/${period.id}`} className="w-full">
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                  {title(period)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {totalSpent(period)} / {totalBudget(period)}
                </p>
              </div>
            </Link>
          </SwipeableListItem>
        ))}
    </SwipeableList>
  );
}

function Actions({ remove }: { remove: () => void }) {
  return (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => remove()}>
        <span className="flex items-center bg-red-orange-500 text-white px-3">
          <TrashIcon className="size-6 pr-2" /> <span className="">Delete</span>
        </span>
      </SwipeAction>
    </TrailingActions>
  );
}
