import dynamic from "next/dynamic";
import Image from "next/image";

const LazyHeroSection = dynamic(
  () => import("./components/HomeComponents/Hero"),
  {
    loading: () => <>Preparing</>,
  }
);

export default function Home() {
  return (
      <div className="overflow-x-hidden overflow-y-hidden">
        <div className="min-h-screen flex items-center justify-center">
          <LazyHeroSection />
          
        </div>
      </div>
  );
}
