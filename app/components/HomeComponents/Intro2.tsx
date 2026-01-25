"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextAnimate } from "./TextAnimation";
import { ColourfulText } from "../ColorfulText";

const Intro2: React.FC = () => {
  // We use a tall container to allow for "scrollytelling"
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- Animation Phases ---

  // Phase 1: "Hi, I am Adnan"
  // Enters immediately (static at top), then fades out and moves up
  const text1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.4], ["0%", "-50%"]);
  const text1Scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.8]);
  const text1Blur = useTransform(scrollYProgress, [0, 0.4], ["0px", "10px"]);


  // Phase 2: "A Fullstack Developer"
  // Enters from bottom/invisible to center/visible
  const text2Opacity = useTransform(scrollYProgress, [0.4, 0.55, 1], [0, 1, 1]);

  // Start from much lower (try "120%" or even "150%")
  const text2Y = useTransform(scrollYProgress, [0.4, 0.55], ["100%", "50%"]);

  const text2Scale = useTransform(
    scrollYProgress,
    [0.4, 0.55, 1],
    [0.85, 1, 1],
  );

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    // This container is TALL (300vh) to create scroll distance
    <section
      ref={containerRef}
      // className="relative h-[200vh] w-full bg-zinc-950"
      className="relative h-[120vh] w-full"
    >
      {/* Sticky Container: Pinned to viewport while scrolling through the parent */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Abstract Background Element */}
        <motion.div 
          style={{ y: bgY }}
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 w-125 h-125 bg-rose-600/20 rounded-full blur-[120px] mix-blend-screen" />
        </motion.div>

        {/* First Text Group: "Hi, I am Adnan" */}
        <motion.div
          className="absolute z-10 flex flex-col items-center justify-center text-center px-4"
          style={{
            opacity: text1Opacity,
            y: text1Y,
            scale: text1Scale,
            filter: `blur(${text1Blur})`, // Dynamic blur only works if motion handles the string, simplified here
          }}
        >
          <TextAnimate
            text="Hi, I am"
            type="whipInUp"
            className="text-6xl lg:text-[160px] mb-4 tracking-wide"
            colorfulText={<ColourfulText text="Adnan" />}
          />
        </motion.div>

        {/* Second Text Group: "A Fullstack Developer" */}
        <motion.div
          className="absolute z-20 px-6 text-center mt-42"
          style={{
            opacity: text2Opacity,
            y: text2Y,
            scale: text2Scale,
          }}
        >
          {/* <h2 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-500 drop-shadow-2xl">
            Fullstack
            <br />
            <span className="text-indigo-500">Developer</span>
          </h2> */}
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-wide  dark:font-stranger! text-transparent bg-clip-text bg-[linear-gradient(45deg,var(--2016-a0),var(--2016-a10)_25%,var(--2016-a20)_50%,var(--2016-a30)_100%)]  drop-shadow-2xl">
            Fullstack
            <br />
            <span className="text-indigo-400">Developer</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-xl md:text-2xl text-zinc-400 font-light tracking-widest uppercase"
          >
            Building the digital future
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-zinc-500">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Intro2;
