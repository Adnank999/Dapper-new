"use client";

import React, { useEffect, useRef, useState, memo } from "react";
import ScrambledTitle from "./ScrambleTittle";
import { useIsMobile } from "@/hooks/use-mobile";


const MemoizedScrambledTitle = memo(ScrambledTitle);

const RainingLetters: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const charElements = useRef<HTMLElement[]>([]);

  const allChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  const charCount = 300;

  const isMobile = useIsMobile();


  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements: HTMLElement[] = [];

    for (let i = 0; i < charCount; i++) {
      const span = document.createElement("span");
      span.textContent = allChars[Math.floor(Math.random() * allChars.length)];
      span.className = "absolute text-slate-600  text-xs ";
      span.style.left = `${Math.random() * 100}%`;
      span.style.top = `${Math.random() * 100}%`;
      span.style.transform = "translate(-50%, -50%)";
      container.appendChild(span);
      elements.push(span);
    }

    charElements.current = elements;

    let animationFrameId: number;
    const speeds = elements.map(() => 0.05 + Math.random() * 0.3);
    const greenTimers = elements.map(() => ({
      isGreen: false,
      timer: 0,
      duration: 0,
    }));

    const animate = () => {
      elements.forEach((el, i) => {
        let top = parseFloat(el.style.top || "0");
        top += speeds[i];
        if (top >= 100) {
          top = -5;
          el.textContent =
            allChars[Math.floor(Math.random() * allChars.length)];
          el.style.left = `${Math.random() * 100}%`;
          greenTimers[i].isGreen = false;
          greenTimers[i].timer = 0;
        }
        el.style.top = `${top}%`;

        // Green duration control
        if (!greenTimers[i].isGreen) {
          if (isMobile ? Math.random() < 0.009 : Math.random() < 0.03) {
            greenTimers[i].isGreen = true;
            greenTimers[i].timer = 0;
            greenTimers[i].duration = isMobile
              ? 5 + Math.random() * 5
              : 10 + Math.random() * 10;
          }
        } else {
          greenTimers[i].timer++;
          if (greenTimers[i].timer >= greenTimers[i].duration) {
            greenTimers[i].isGreen = false;
            greenTimers[i].timer = 0;
          }
        }

        if (greenTimers[i].isGreen) {
          el.className =
            "absolute text-[#00ff00] text-[10px] md:text-sm  font-bold animate-pulse";
        } else {
          el.className =
            "absolute text-slate-600 font-light text-[10px] md:text-sm ";
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      elements.forEach((el) => container.removeChild(el));
    };
  }, []);

  return (
    <div
      className="relative w-full h-screen bg-white dark:bg-black overflow-hidden"
      ref={containerRef}
    >
      {/* Title */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <MemoizedScrambledTitle />
      </div>

      <style jsx global>{`
        .dud {
          color: #0f0;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default RainingLetters;
