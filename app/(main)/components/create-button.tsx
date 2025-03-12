"use client";

import { usePeriodsDispatch } from "@/app/lib/store";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function CreateButton() {
  const periodsDispatch = usePeriodsDispatch();

  return (
    <div className="absolute inset-y-0 right-0 flex items-center">
      <button
        onClick={() => periodsDispatch({ type: "added" })}
        type="button"
        className="inline-flex items-center justify-center rounded-md p-2 text-white bg-violet-500 hover:bg-violet-700 hover:text-white focus:ring-2 focus:ring-black focus:outline-hidden focus:ring-inset"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Create new budget</span>
        <PencilSquareIcon aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}
