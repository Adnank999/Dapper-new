"use cache";

import ContributionsData from "../components/aboutComponents/ContributionData";

import RainingLetters from "../components/aboutComponents/RainingLetters";
import TechnicalStack from "../components/aboutComponents/TechnicalStack";

import { TimelineDemo } from "../components/aboutComponents/TimelineDemo";

import ShuffleText from "../components/ShuffleText";
import AboutMeSection from "./components/about-me";


export default async function About() {
  return (
    <section>
      <AboutMeSection/>
      
     
      <ContributionsData/>


      <TimelineDemo />
    </section>
  );
}
