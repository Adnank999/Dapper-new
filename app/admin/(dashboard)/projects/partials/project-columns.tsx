"use client"

import React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EllipsisVertical, Pencil, Trash2, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Project } from "@/types/projects"


export function getProjectColumns(opts?: {
  onDeleted?: () => void
  onEdited?: () => void
}): ColumnDef<Project>[] {
  return [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <div className="font-medium">{row.original.title}</div>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="secondary">{row.original.category || "Uncategorized"}</Badge>
      ),
      filterFn: (row, columnId, value) => row.getValue(columnId) === value,
    },
    {
      accessorKey: "technologies",
      header: "Tech",
      cell: ({ row }) => {
        const tech = row.original.technologies ?? []
        return (
          <div className="flex flex-wrap gap-1">
            {tech.slice(0, 3).map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
            {tech.length > 3 ? <span className="text-xs text-muted-foreground">+{tech.length - 3}</span> : null}
          </div>
        )
      },
    },
    {
      accessorKey: "link",
      header: "Link",
      cell: ({ row }) => {
        const link = row.original.link
        if (!link) return <span className="text-muted-foreground">—</span>
        return (
          <a className="text-sm underline" href={link} target="_blank" rel="noreferrer">
            Open
          </a>
        )
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const project = row.original
        return (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
              <Eye className="size-4" />
              <span className="sr-only">View</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 cursor-pointer"
              onClick={() => {
                // open edit dialog / route etc.
                // opts?.onEdited?.()
              }}
            >
              <Pencil className="size-4" />
              <span className="sr-only">Edit</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                  <EllipsisVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600"
                  onClick={async () => {
                    // call your delete mutation here
                    // await deleteProject({ variables: { id: project.id } })
                    opts?.onDeleted?.()
                  }}
                >
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]
}
