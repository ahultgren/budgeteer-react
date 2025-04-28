"use client";

import { useSearchParams } from "next/navigation";
import Ledger from "./components/ledger";

export default function Budget() {
  const params = useSearchParams();
  const id = params.get("id");

  if (!id) {
    return <div>Budget not found</div>;
  }

  return <Ledger id={id} />;
}
