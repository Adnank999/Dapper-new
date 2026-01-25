
import dynamic from "next/dynamic";
import { MenuProvider } from "../context/MenuContext";
import { Curve } from "recharts";
import CurvedNavbar from "../components/CurvedNavbar";

const SlidingLogo = dynamic(
  () => import("@/app/components/globalComponents/FooterWrapper"),
  {
    loading: () => <div className="h-40 w-full" />,
  },
);


export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <MenuProvider>
      <div className="client-scope min-h-screen flex flex-col">
        <CurvedNavbar/>
        {children}
          {/* footer */}
        <footer className="mt-auto">
          <SlidingLogo />
        </footer>
      </div>
      
    </MenuProvider>
  );
}
