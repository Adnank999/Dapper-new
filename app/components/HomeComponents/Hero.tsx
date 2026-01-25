"use client"

import { useLazyMount } from "@/hooks/use-lazyMount"
import dynamic from "next/dynamic"


// ✅ dynamic imports (code-split)
const Navigation = dynamic(() => import("../NavHeroContainer"), {
  loading: () => <div className="h-16 w-full" />,
})

const TextWithParticles = dynamic(() => import("../HomeComponents/Intro2"), {
  loading: () => <div className="h-40 w-full" />,
})

const GlowingEffectDemo = dynamic(() => import("./glowing-effectDemo"), {
  loading: () => <div className="h-screen w-full max-w-4xl mx-auto " />,
})

const Gradient = dynamic(() => import("./GradientModelWrapper"), {
  loading: () => <div className="h-40 w-full" />,
})

const Scene = dynamic(() => import("./3dmodels/Scene"), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full" />,
})

const Testimonial = dynamic(() => import("./Testimonial"), {
  loading: () => <div className="h-40 w-full" />,
})

function LazySection({
  children,
  rootMargin,
  minScrollY,
  className,
}: {
  children: React.ReactNode
  rootMargin?: string
  minScrollY?: number
  className?: string
}) {
  const { ref, mounted } = useLazyMount({ rootMargin, minScrollY })
  return (
    <div ref={ref} className={className}>
      {mounted ? children : null}
    </div>
  )
}

export default function Hero() {
  return (
    <div className="w-full">
      <LazySection rootMargin="0px">
        <Navigation />
      </LazySection>

      <LazySection rootMargin="0px" className="min-h-screen">
        <TextWithParticles />
      </LazySection>

      <LazySection className="max-w-4xl mx-auto" minScrollY={100}>
        <GlowingEffectDemo />
      </LazySection>

      <LazySection minScrollY={220}>
        <Gradient />
      </LazySection>

      <LazySection minScrollY={150}>
        <Scene />
      </LazySection>

      <LazySection minScrollY={50}>
        <Testimonial />
      </LazySection>
    </div>
  )
}
