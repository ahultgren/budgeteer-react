"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Dispatch, JSX, SetStateAction, useState } from "react";
import { Period, usePeriods } from "../lib/store";

const navigation = [
  {
    name: "Download backup",
    href: downloadData,
    current: false,
    Icon: ArrowDownTrayIcon,
  },
  {
    name: "Import backup",
    href: "/import",
    current: false,
    Icon: ArrowUpTrayIcon,
  },
];

function downloadData(periods: Period[]) {
  return `data:application/octet-stream,${encodeURIComponent(
    JSON.stringify(periods)
  )}`;
}

export default function Nav({
  RightButton,
  LeftButton,
}: {
  RightButton?: JSX.Element;
  LeftButton?: JSX.Element;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bg-violet-50 dark:bg-violet-900 sticky top-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-13 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center">
              {LeftButton ?? (
                <button
                  onClick={() => setOpen(true)}
                  className="group relative inline-flex items-center justify-center rounded-md p-2 text-white bg-violet-500 hover:bg-violet-700 hover:text-white focus:ring-2 focus:ring-black focus:outline-hidden focus:ring-inset"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-4 group-data-open:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-4 group-data-open:block"
                  />
                </button>
              )}
            </div>
            {/* <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
          </div> */}
            <div className="absolute inset-y-0 right-0 flex items-center">
              {RightButton}
            </div>
          </div>
        </div>
      </nav>
      <MenuDrawer open={open} setOpen={setOpen} />
    </>
  );
}

function MenuDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const periods = usePeriods();

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 dark:bg-black/75 transition-opacity duration-400 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 left-0 flex w-90 max-w-full pr-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-400 ease-in-out data-closed:-translate-x-full sm:duration-400"
            >
              <TransitionChild>
                <div className="absolute top-0 right-0 mr-4 flex pt-4 pl-2 duration-400 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="relative rounded-md text-gray-500 hover:text-black focus:ring-2 focus:ring-black focus:outline-hidden focus:ring-inset"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-900 py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Budgeteer
                  </h1>
                </div>
                <ul className="relative mt-6 px-4 sm:px-6 m-4 rounded border border-gray-200">
                  {navigation.map(({ name, Icon, href }, i) => (
                    <li key={i} className="">
                      <Link
                        href={typeof href === "function" ? href(periods) : href}
                        className="flex py-2"
                      >
                        <Icon
                          aria-hidden="true"
                          className="size-5 inline-block mr-2"
                        />
                        <span>{name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
