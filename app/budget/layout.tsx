"use client";

import Nav from "@/app/components/nav";
import { ArrowPathIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function BackButton() {
  return (
    <Link
      href="/"
      className="group relative inline-flex items-center justify-center rounded-md p-1 pr-3 text-white bg-violet-500 hover:bg-violet-700 hover:text-white focus:ring-2 focus:ring-black focus:outline-hidden focus:ring-inset"
    >
      <ChevronLeftIcon aria-hidden="true" className="block size-5 pr-1" />
      <span className="">Budgets</span>
    </Link>
  );
}

function FlipButton() {
  const pathname = usePathname();
  const [, , summary] = pathname.split(/\//g);
  const params = useSearchParams();
  const id = params.get("id");
  const path = `/budget${summary ? "" : "/summary"}?id=${id}`;
  const label = summary ? "Ledger" : "Summary";

  return (
    <Link
      href={path}
      prefetch={true}
      className="group relative inline-flex items-center justify-center rounded-md p-1 pl-2 pr-3 text-white bg-violet-500 hover:bg-violet-700 hover:text-white focus:ring-2 focus:ring-black focus:outline-hidden focus:ring-inset"
    >
      <ArrowPathIcon aria-hidden="true" className="block size-5 pr-1" />
      <span className="">{label}</span>
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav
        LeftButton={<BackButton />}
        RightButton={
          <Suspense fallback={<div>Loading...</div>}>
            <FlipButton />
          </Suspense>
        }
      />
      <div className="grow flex flex-col md:px-12">{children}</div>
    </div>
  );
}
