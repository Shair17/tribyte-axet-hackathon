"use client";

import * as React from "react";

import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/Logo/Logo";
import { Link } from "react-router-dom";
import { paths } from "@/shared/config/paths";
import {
  Calendar,
  FileText,
  LayoutDashboard,
  Settings,
  Sparkles,
  UsersRound,
} from "lucide-react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: paths.app.dashboard,
      icon: LayoutDashboard,
    },
    {
      title: "Colaboradores",
      url: paths.employees.root,
      icon: UsersRound,
    },
    {
      title: "Ausencias",
      url: paths.absences.root,
      icon: Calendar,
    },
    {
      title: "Reportes",
      url: paths.reports.root,
      icon: FileText,
    },
    {
      title: "AI Insights",
      url: paths.aiInsights.root,
      icon: Sparkles,
    },
    {
      title: "Configuraciones",
      url: paths.settings.root,
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to={paths.app.dashboard}>
                <Logo className="w-24!" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
