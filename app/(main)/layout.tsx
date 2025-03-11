import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Nav from "@/app/components/nav";

function RightButton() {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center">
      <button
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-full">
      <Nav RightButton={<RightButton />} />
      <div className="px-4 md:px-12 py-1">{children}</div>
    </div>
  );
}
