"use client";

import React, { RefObject, Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, useProgress } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";

import ScrollReveal from "../ScrollReveal";
import useIsMobile from "@/hooks/useIsMobile";
import Model2 from "./Model2";
import { ComicText } from "../../ComicText";

const Loader = () => {
  const { progress } = useProgress();
  // show loader if you want; hidden makes it feel "frozen"
  return <Html center>{progress.toFixed(1)} % loaded</Html>;
};

const Scene = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // keep same API as your GSAP version
  const scrollProgress = useRef(0);

  const isMobile = useIsMobile();

  const [isVisible, setIsVisible] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showScrollReveal, setShowScrollReveal] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  // progress for THIS section only (like ScrollTrigger self.progress)
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    // similar feel to "start: top+=50 top" and "end: bottom bottom"
    // (you can tweak these offsets)
    offset: ["start start", "end end"],
  });

  console.log("isVisible", isVisible);

  const startOffset = 0.08; // starts after 8% of section scroll
  const endOffset = 0.92; // finishes before the end

  const remapProgress = (v: number) => {
    const t = (v - startOffset) / (endOffset - startOffset);
    return Math.min(1, Math.max(0, t));
  };

  // Write motion progress into your ref (so Model2 can read it in useFrame)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const p = remapProgress(v);
    scrollProgress.current = p;

    // show model only after startOffset
    const shouldShow = v >= startOffset;

    if (shouldShow) {
      if (!isVisible) setIsVisible(true);
      if (!showText) setShowText(true);
    } else {
      if (isVisible) setIsVisible(false);
      if (showText) setShowText(false);
      if (showScrollReveal) setShowScrollReveal(false);
    }

    // show end text near end
    if (v > endOffset) {
      if (!showScrollReveal) setShowScrollReveal(true);
    } else {
      if (showScrollReveal) setShowScrollReveal(false);
    }
  });

  /**
   * Canvas opacity:
   * - fade in early
   * - hold in the middle
   * - fade out near the end (like your tl.to opacity 0)
   */
  const canvasOpacity = useTransform(
    scrollYProgress,
    [0.0, startOffset, endOffset, 1.0],
    [0, 1, 1, 0],
  );

  // Optional: you can also move/scale the canvas subtly if you want
  // const canvasScale = useTransform(scrollYProgress, [0, 0.1], [0.98, 1]);

  return (
    <div
      ref={scrollContainerRef}
      style={{
        position: "relative",
        height: "450vh",
        width: "100vw",
        overflow: "hidden",
      }}
      className="bg-background"
    >
      {/* motion wrapper controls opacity (like GSAP timeline did) */}
      <motion.div
        style={{
          opacity: canvasOpacity,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Canvas
          frameloop="always"
          gl={{
            powerPreference: "high-performance",
            alpha: false,
            stencil: false,
            antialias: true,
          }}
          camera={{
            position: [
              -6.782809400330284, 2.3973643603409034, 1.4024392340644003,
            ],
            fov: isMobile ? 45 : 35,
          }}
          dpr={[1, 1.5]}
          style={{
            width: "100vw",
            height: "100vh",
            display: "block",
          }}
        >
          <directionalLight position={[-5, -5, 5]} intensity={4} />

          <Suspense fallback={<Loader />}>
            <Model2
              visible={isVisible}
              scrollProgress={scrollProgress}
              animationCompleted={animationCompleted}
              setAnimationCompleted={setAnimationCompleted}
            />
          </Suspense>

          <EffectComposer>
            <Bloom
              intensity={0.5}
              luminanceThreshold={0}
              luminanceSmoothing={0}
            />
          </EffectComposer>
        </Canvas>
      </motion.div>

      {/* Text 1 - same placement */}
      {showText && (
        <div className="flex items-center justify-center px-24 lg:px-0 w-96 h-auto min-h-screen absolute top-56 left-0 lg:left-auto lg:right-24">
          <ScrollReveal
            scrollContainerRef={scrollContainerRef as RefObject<HTMLElement>}
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={50}
          >
            With Great Power Comes Great Responsibility.
          </ScrollReveal>
        </div>
      )}

      {/* Text 2 - appears near end like your onComplete */}
      {showScrollReveal && (
        <div className="flex items-start justify-center w-full lg:w-96 px-5 text-center lg:px-0 h-auto min-h-screen absolute bottom-[5%] lg:bottom-0 left-0 lg:left-auto lg:right-24">
          <ScrollReveal
            scrollContainerRef={scrollContainerRef as RefObject<HTMLElement>}
            baseOpacity={1}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            Code your vision into existence, Where code becomes magic
            <ComicText>
              <span className="text-[3rem] leading-none">🪄🐦‍🔥💥</span>
            </ComicText>
          </ScrollReveal>
        </div>
      )}
    </div>
  );
};

export default Scene;
