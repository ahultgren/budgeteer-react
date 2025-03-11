import Nav from "./components/nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Nav />
      <div className="px-4 md:px-12 py-1">{children}</div>
    </div>
  );
}
