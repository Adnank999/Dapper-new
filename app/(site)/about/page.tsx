"use cache";

import ContributionsData from "@/app/components/aboutComponents/ContributionData";
import AboutMeSection from "./components/about-me";
import { TimelineDemo } from "@/app/components/aboutComponents/TimelineDemo";


export default async function About() {
  return (
    <section>
      <AboutMeSection/>
      
     
      <ContributionsData/>


      <TimelineDemo />
    </section>
  );
}
