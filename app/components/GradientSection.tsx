"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTheme } from "next-themes";

function PopupWord({
  children,
  className,
  cool = false,
}: {
  children: string;
  className: string;
  cool?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 15%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  const scale = cool
    ? useTransform(scrollYProgress, [0, 0.75, 1], [0, 1.4, 1.2])
    : useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, y, scale, willChange: "transform, opacity", transformOrigin: "center" }}
    >
      {children}
    </motion.div>
  );
}

const DARK_BG = `linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(6, 0, 16, 0) 30%),
linear-gradient(0deg, rgba(6, 0, 16, 0.9) 4%, rgba(6, 0, 16, 0) 50%),
radial-gradient(circle at 50% 70%, #25008C 0%, #170024 65%)`;

const LIGHT_BG = `radial-gradient(circle at 50% 70%, #ffffff 0%, #f3f4f6 60%, #e5e7eb 100%)`;

const GradientSection = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div
      className="flex flex-col justify-center items-center h-screen"
      style={{ background: isDark ? DARK_BG : LIGHT_BG }}
    >
      <div className="font-my-font-medium flex flex-col items-center leading-none">
        <PopupWord className="text-[153px] font-extrabold text-center tracking-wider text-neutral-900 dark:text-white">
          Build
        </PopupWord>

        <PopupWord
          cool
          className="text-[220px] font-extrabold text-center tracking-wider text-sky-600 dark:text-[#0099fc]"
        >
          Cool
        </PopupWord>

        <PopupWord className="text-[153px] font-extrabold text-center tracking-wider text-neutral-900 dark:text-white">
          Stuff
        </PopupWord>
      </div>
    </div>
  );
};

export default GradientSection;
