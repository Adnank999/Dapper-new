"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsMobile from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const scrubValue = isMobile ? 1.5 : 0.5;

  // Build renderable content:
  // - split only string parts into animated word spans
  // - keep React elements (e.g. <ComicText />) as-is
  const content = useMemo(() => {
    const nodes = React.Children.toArray(children);

    return nodes.map((node, idx) => {
      if (typeof node === "string") {
        return node.split(/(\s+)/).map((word, i) => {
          if (/^\s+$/.test(word)) return word;

          return (
            <span
              key={`${idx}-${i}`}
              className={[
                "word",
                // gradient text
                "bg-[linear-gradient(180deg,oklch(100%_0_0),oklch(77.3%_0_0),oklch(46.4%_0_0))]",
                "bg-clip-text text-transparent",
                "font-extrabold!",
              ].join(" ")}
            >
              {word}
            </span>
          );
        });
      }

      // Keep elements (ComicText, icons, spans...) visible and inline
      return (
        <span key={idx} className="inline-block align-middle">
          {node}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // If you ever use a custom scroll container, you can wire it here:
    // const scroller = scrollContainerRef?.current ?? document.body;
    const scroller = document.body;

    // Rotation animation
    gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "none",
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom",
          end: rotationEnd,
          scrub: true,
        },
      }
    );

    const wordElements = el.querySelectorAll<HTMLElement>(".word");

    // Opacity animation (words only)
    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: "opacity" },
      {
        ease: "none",
        opacity: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom-=30%",
          end: wordAnimationEnd,
          scrub: true,
        },
      }
    );

    // Blur animation (words only)
    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: "none",
          filter: "blur(0px)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom-=20%",
            end: wordAnimationEnd,
            scrub: scrubValue,
          },
        }
      );
    }

    return () => {
      // Kill only triggers created by this component (simple approach: kill all)
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(el);
      gsap.killTweensOf(wordElements);
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    scrubValue,
  ]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <div className={`scroll-reveal-text ${textClassName}`}>
        <div className="leading-[4rem] text-3xl lg:text-[1em] px-2 py-1 inline-block">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ScrollReveal;
