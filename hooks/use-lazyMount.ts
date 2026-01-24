"use client"

import { useEffect, useRef, useState } from "react"

type Options = {
  rootMargin?: string
  minScrollY?: number
}

export function useLazyMount({ rootMargin = "0px", minScrollY = 0 }: Options = {}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)

  // ensures we only mount once even if multiple triggers happen
  const mountedOnceRef = useRef(false)

  useEffect(() => {
    if (mounted || mountedOnceRef.current) return

    const mount = () => {
      if (mountedOnceRef.current) return
      mountedOnceRef.current = true
      setMounted(true)
    }

    // ✅ Defer initial check to avoid sync setState in effect body
    const rafId = requestAnimationFrame(() => {
      if (minScrollY > 0 && window.scrollY >= minScrollY) {
        mount()
      }
    })

    // Scroll threshold
    const onScroll = () => {
      if (mountedOnceRef.current) return
      if (minScrollY > 0 && window.scrollY >= minScrollY) {
        mount()
      }
    }

    if (minScrollY > 0) {
      window.addEventListener("scroll", onScroll, { passive: true })
    }

    // IntersectionObserver
    const el = ref.current
    let obs: IntersectionObserver | null = null

    if (el && !mountedOnceRef.current) {
      obs = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) mount()
        },
        { rootMargin }
      )
      obs.observe(el)
    }

    return () => {
      cancelAnimationFrame(rafId)
      if (obs) obs.disconnect()
      if (minScrollY > 0) window.removeEventListener("scroll", onScroll)
    }
  }, [mounted, rootMargin, minScrollY])

  return { ref, mounted }
}
