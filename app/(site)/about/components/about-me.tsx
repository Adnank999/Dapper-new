"use client";

import dynamic from "next/dynamic";

const RainingLetters = dynamic(
  () => import("@/app/components/aboutComponents/RainingLetters"),
  { ssr: false, loading: () => <div className="h-40 w-full" /> },
);

const ShuffleText = dynamic(() => import("@/app/components/ShuffleText"), {
  ssr: false,
  loading: () => <div className="h-24 w-full" />,
});

const TechnicalStack = dynamic(
  () => import("@/app/components/aboutComponents/TechnicalStack"),
  {
    ssr: false,
    loading: () => <div className="h-24 w-full" />,
  },
);

export default function AboutMeSection() {
  return (
    <>
      <div className="relative z-10">
        <RainingLetters />
      </div>

      <div className="mx-auto max-w-6xl h-screen md:h-[200vh] relative">
        <ShuffleText />
      </div>

      <div className="relative z-10 bg-background mt-0 md:mt-24 lg:mt-42">
        <TechnicalStack />
      </div>
    </>
  );
}
