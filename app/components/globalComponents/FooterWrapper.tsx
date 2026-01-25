import { Github, Linkedin } from "lucide-react";
import React from "react";
import SlidingLogo, { SlidingLogoMarqueeItem } from "../SlidingLogo";
const logos: SlidingLogoMarqueeItem[] = [
  {
    id: "1",
    content: <Github />,
    href: "https://github.com/Adnank999",
  },
  {
    id: "2",
    content: <Linkedin />,
    href: "https://www.linkedin.com/in/adnan-khan-9292971a6/",
  },
  {
    id: "3",
    content: <Github />,
    href: "https://github.com/Adnank999",
  },
  {
    id: "4",
    content: <Linkedin />,
    href: "https://www.linkedin.com/in/adnan-khan-9292971a6/",
  },
  {
    id: "5",
    content: <Github />,
    href: "https://github.com/Adnank999",
  },
  {
    id: "6",
    content: <Linkedin />,
    href: "https://www.linkedin.com/in/adnan-khan-9292971a6/",
  },
];
const FooterWrapper = () => {
  return (
    <div className="max-w-2xl mx-auto w-full">
      <SlidingLogo
        items={logos}
        speed={60}
        height="120px"
        enableBlur={true}
        blurIntensity={2}
        pauseOnHover={true}
        showGridBackground={true}
        // onItemClick={(item) => console.log("Clicked:", item.id)}
      />
    </div>
  );
};

export default FooterWrapper;
