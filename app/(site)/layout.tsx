import { MenuProvider } from "../context/MenuContext";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MenuProvider>
      <div className="client-scope">{children}</div>
    </MenuProvider>
  );
}
