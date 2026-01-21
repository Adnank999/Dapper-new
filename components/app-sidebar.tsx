"use client"

import * as React from "react"
import {
  LayoutPanelLeft,
  LayoutDashboard,
  Mail,
  CheckSquare,
  MessageCircle,
  Calendar,
  Shield,
  AlertTriangle,
  Settings,
  HelpCircle,
  CreditCard,
  LayoutTemplate,
  Users,
} from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { SidebarNotification } from "@/components/sidebar-notification"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "ShadcnStore",
    email: "store@example.com",
    avatar: "",
  },
  navGroups: [
    // {
    //   label: "Dashboards",
    //   items: [
    //     {
    //       title: "Dashboard 1",
    //       url: "/admin/dashboard",
    //       icon: LayoutDashboard,
    //     },
    //     {
    //       title: "Dashboard 2",
    //       url: "/admin/dashboard-2",
    //       icon: LayoutPanelLeft,
    //     },
    //   ],
    // },
    {
      label: "Apps",
      items: [
         {
          title: "Projects",
          url: "/admin/projects",
          icon: CheckSquare,
        },
        {
          title: "Tasks",
          url: "/admin/tasks",
          icon: CheckSquare,
        },
        {
          title: "Chat",
          url: "/admin/chat",
          icon: MessageCircle,
        },
        // {
        //   title: "Calendar",
        //   url: "/admin/calendar",
        //   icon: Calendar,
        // },
        {
          title: "Users",
          url: "/admin/users",
          icon: Users,
        },
      ],
    },
    {
      label: "Pages",
      items: [
        // {
        //   title: "Errors",
        //   url: "#",
        //   icon: AlertTriangle,
        //   items: [
        //     {
        //       title: "Unauthorized",
        //       url: "/errors/unauthorized",
        //     },
        //     {
        //       title: "Forbidden",
        //       url: "/errors/forbidden",
        //     },
        //     {
        //       title: "Not Found",
        //       url: "/errors/not-found",
        //     },
        //     {
        //       title: "Internal Server Error",
        //       url: "/errors/internal-server-error",
        //     },
        //     {
        //       title: "Under Maintenance",
        //       url: "/errors/under-maintenance",
        //     },
        //   ],
        // },
        {
          title: "Settings",
          url: "#",
          icon: Settings,
          items: [
            {
              title: "User Settings",
              url: "/admin/settings/user",
            },
            {
              title: "Account Settings",
              url: "/admin/settings/account",
            },
            {
              title: "Plans & Billing",
              url: "/admin/settings/billing",
            },
            {
              title: "Appearance",
              url: "/admin/settings/appearance",
            },
            {
              title: "Notifications",
              url: "/admin/settings/notifications",
            },
            {
              title: "Connections",
              url: "/admin/settings/connections",
            },
          ],
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Logo size={24} className="text-current" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">ShadcnStore</span>
                  <span className="truncate text-xs">Admin Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarNotification />
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
