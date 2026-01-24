"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { ArrowUpRight } from "lucide-react"

export type StatCardItem = {
  key: string
  title: string
  value: React.ReactNode
  subtitle?: React.ReactNode

  // left icon
  icon?: LucideIcon

  // optional badge (right side)
  badgeText?: React.ReactNode
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"
  badgeClassName?: string

  // click support
  onClick?: () => void
  href?: string // if you prefer linking (works with <a>)
}

type StatCardsProps = {
  data: StatCardItem[]
  className?: string
  columnsClassName?: string // override grid cols if you want
  showArrowHint?: boolean
}

export function StatCards({
  data,
  className,
  columnsClassName = "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
  showArrowHint = true,
}: StatCardsProps) {
  return (
    <div className={cn(columnsClassName, className)}>
      {data.map((item) => {
        const clickable = Boolean(item.onClick || item.href)

        const content = (
          <Card
            className={cn(
              "border",
              clickable && "cursor-pointer transition hover:shadow-sm"
            )}
            onClick={item.onClick}
            role={clickable ? "button" : undefined}
            tabIndex={clickable ? 0 : undefined}
            onKeyDown={(e) => {
              if (!item.onClick) return
              if (e.key === "Enter" || e.key === " ") item.onClick()
            }}
          >
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                {item.icon ? (
                  <item.icon className="text-muted-foreground size-6" />
                ) : (
                  <span />
                )}

                {item.badgeText != null ? (
                  <Badge
                    variant={item.badgeVariant ?? "outline"}
                    className={cn(item.badgeClassName)}
                  >
                    {item.badgeText}
                  </Badge>
                ) : null}
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-sm font-medium">
                  {item.title}
                </p>

                <div className="text-2xl font-bold">{item.value}</div>

                {(item.subtitle != null || (showArrowHint && clickable)) && (
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    {item.subtitle ?? <span>View details</span>}
                    {showArrowHint && clickable ? (
                      <ArrowUpRight className="size-3" />
                    ) : null}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )

        // If href is provided, wrap in <a> (works without Next/link too)
        return item.href ? (
          <a key={item.key} href={item.href} className="block">
            {content}
          </a>
        ) : (
          <div key={item.key}>{content}</div>
        )
      })}
    </div>
  )
}
