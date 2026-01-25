"use cache";
import Hero from "@/app/components/HomeComponents/Hero";

export default async function Home() {
  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <Hero />
    </div>
  );
}
