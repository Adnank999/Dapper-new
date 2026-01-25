"use cache";
import dynamic from "next/dynamic";

const LazyHeroSection = dynamic(
  () => import("@/app/components/HomeComponents/Hero"),
  {
    loading: () => <>Preparing</>,
  },
);

export default async function Home() {
  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <LazyHeroSection />

    </div>
  );
}
