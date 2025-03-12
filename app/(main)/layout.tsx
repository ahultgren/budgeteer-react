import Nav from "@/app/components/nav";
import CreateButton from "./components/create-button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-full">
      <Nav RightButton={<CreateButton />} />
      <div className="px-4 md:px-12 py-1">{children}</div>
    </div>
  );
}
