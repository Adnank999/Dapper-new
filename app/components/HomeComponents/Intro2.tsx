
// "use client";
// import React, { useEffect, useRef } from "react";
// import { TextAnimate } from "./TextAnimation";
// import { ColourfulText } from "../ColorfulText";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const Intro2 = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const nextTextRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     const nextEl = nextTextRef.current;
//     if (!container || !nextEl) return;

//     const ctx = gsap.context(() => {
//       // select inside this section only
//       const chars = gsap.utils.toArray<HTMLElement>(".ta-char");
//       const colorful = gsap.utils.toArray<HTMLElement>(".ta-colorful");

//       gsap.set([chars, colorful], { willChange: "transform,opacity" });
//       gsap.set(nextEl, { opacity: 0, y: 400, scale: 0.5, visibility: "visible" });

//       // scroll-linked exit of the headline
//       gsap.timeline({
//         scrollTrigger: {
//           trigger: container,
//           start: "top+=50 top",   // adjust to taste
//           end: "top+=400 top",     // how long the scrub lasts
//           scrub: 1,                // reverse on scroll-up
//           markers: false,
//         },
//       })
//       .to(chars, {
//         y: -200,
//         opacity: 0,
//         stagger: 0.09,             // one-by-one
//         ease: "power4.inOut",
//       }, 0)
//       .to(colorful, {
//         y: -100,
//         opacity: 0,
//         ease: "power4.inOut",
//       }, 0);                        // same start time as chars

//       // bring in the next line while the headline leaves
//       gsap.fromTo(nextEl,
//         { opacity: 0, y: 400, scale: 0.5 },
//         {
//           opacity: 1,
//           y: 300,
//           scale: 1,
//           ease: "power2.inOut",
//           scrollTrigger: {
//             trigger: container,
//             start: "top+=300 top",
//             end: "bottom center",
//             scrub: 1,
//             markers: false,
//           },
//         }
//       );
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="flex justify-center items-center h-screen w-full relative "
//     >
//       <TextAnimate
//         text="Hi, I am"
//         colorfulText={<ColourfulText text="Adnan" />}
//         type="whipInUp" // keeps your entrance; GSAP handles the scroll exit
//         className="leading-5 text-6xl lg:text-8xl"
//       />

//       <div
//         ref={nextTextRef}
//         className="font-my-font-bold px-10 absolute text-shadow-red text-9xl"
//         style={{
//           opacity: 0,
//           visibility: "visible",
//           minHeight: "120px",
//           willChange: "transform, opacity, scale",
//         }}
//       >
//         <h2 className="text-[#fa1e16] text-5xl md:text-6xl lg:text-8xl text-start lg:text-center font-stranger! tracking-wider">
//           A Fullstack Developer
//         </h2>

     
//       </div>
//     </div>
//   );
// };

// export default Intro2;


"use client";

import React, { useRef } from "react";
import { TextAnimate } from "./TextAnimation";
import { ColourfulText } from "../ColorfulText";
import { motion, useScroll, useTransform } from "motion/react";

const Intro2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress for this section only
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"], // when section enters -> when it leaves
  });

  // Headline exit (0 -> 0.45)
  const headlineY = useTransform(scrollYProgress, [0, 0.45], [0, -200]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  // Next text enter (0.25 -> 0.75)
  const nextOpacity = useTransform(scrollYProgress, [0.25, 0.40], [0, 1]);
  const nextY = useTransform(scrollYProgress, [0.25, 0.55], [500, 0]);
  const nextScale = useTransform(scrollYProgress, [0.10, 0.45], [0.75, 1]);

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center h-screen w-full relative"
    >
      {/* Headline group */}
      <motion.div style={{ y: headlineY, opacity: headlineOpacity }}>
        <TextAnimate
          text="Hi, I am"
          colorfulText={<ColourfulText text="Adnan" />}
          type="whipInUp"
          className="leading-5 text-6xl lg:text-8xl"
        />
      </motion.div>

      {/* Next line */}
      <motion.div
        className="font-my-font-bold px-10 absolute text-shadow-red"
        style={{
          opacity: nextOpacity,
          y: nextY,
          scale: nextScale,
          willChange: "transform, opacity",
        }}
      >
        <h2 className="text-[#fa1e16] text-5xl md:text-6xl lg:text-8xl text-start lg:text-center font-stranger! tracking-wider">
          A Fullstack Developer
        </h2>
      </motion.div>
    </div>
  );
};

export default Intro2;
