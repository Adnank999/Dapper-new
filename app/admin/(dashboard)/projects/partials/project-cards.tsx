"use client"

import React, { useMemo } from "react"
import { Layers, LayoutGrid } from "lucide-react"
import { StatCards, type StatCardItem } from "../../components/stat-cards"

type Project = {
  id: string
  category?: string | null
}

type ProjectCardProps = {
  projects: Project[]
  onSelectCategory?: (category: string | null) => void // null => all
}

export function ProjectCard({ projects, onSelectCategory }: ProjectCardProps) {
  const cards: StatCardItem[] = useMemo(() => {
    const total = projects.length

    const byCategory = projects.reduce<Record<string, number>>((acc, p) => {
      const c = (p.category || "Uncategorized").trim()
      acc[c] = (acc[c] || 0) + 1
      return acc
    }, {})

    const categoryCards: StatCardItem[] = Object.entries(byCategory)
      .sort((a, b) => b[1] - a[1])
      .map(([category, count]) => ({
        key: category,
        title: category,
        value: count,
        icon: LayoutGrid,
        onClick: () => onSelectCategory?.(category),
      }))

    return [
      {
        key: "total",
        title: "Total Projects",
        value: total,
        icon: Layers,
        badgeText: "Live",
        badgeClassName:
          "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/20 dark:text-blue-400",
        onClick: () => onSelectCategory?.(null),
      },
      ...categoryCards,
    ]
  }, [projects, onSelectCategory])

  return <StatCards data={cards} />
}
