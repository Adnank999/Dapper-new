import dynamic from "next/dynamic";

const LazyHeroSection = dynamic(
  () => import("../../components/HomeComponents/Hero"),
  {
    loading: () => <>Preparing</>,
  },
);

export default function Home() {
  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <LazyHeroSection />

    </div>
  );
}
