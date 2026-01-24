"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { useTheme } from "next-themes"

function PopupWord({
  children,
  className,
  cool = false,
}: {
  children: string
  className: string
  cool?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 15%"],
  })

  const scale = cool
    ? useTransform(scrollYProgress, [0, 0.75, 1], [0, 1.4, 1.2])
    : useTransform(scrollYProgress, [0, 1], [0, 1])

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [50, 0])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity,
        y,
        scale,
        willChange: "transform, opacity",
        transformOrigin: "center",
      }}
    >
      {children}
    </motion.div>
  )
}

// ✅ Base backgrounds (do NOT include the radial glow here)
const BG = "6, 0, 16" // rgb(6,0,16)

export const DARK_BASE = `
  linear-gradient(180deg, rgba(${BG}, 0.55) 0%, rgba(${BG}, 0) 30%),
  linear-gradient(0deg, rgba(${BG}, 0.95) 4%, rgba(${BG}, 0) 50%),
  rgb(${BG})
`

const LIGHT_BASE = `radial-gradient(circle at 50% 70%, #ffffff 0%, #f3f4f6 60%, #e5e7eb 100%)`

// ✅ Radial glow only (localized with background-size)
const DARK_GLOW = `radial-gradient(circle at 50% 70%, rgba(37,0,140,0.95) 0%, rgba(23,0,36,0) 65%)`

const GradientSection = () => {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: isDark ? DARK_BASE : LIGHT_BASE }}
    >
      {/* ✅ Glow overlay (doesn't change base background) */}
      {isDark && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: DARK_GLOW,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 70%",
            mixBlendMode: "screen",
            opacity: 1,
          }}
        />
      )}

      <div className="relative z-10 font-my-font-medium flex flex-col items-center leading-none">
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
  )
}

export default GradientSection
