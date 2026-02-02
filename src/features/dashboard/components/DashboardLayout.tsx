import React, { Suspense } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { SidebarHeader } from "./SidebarHeader";
import { PageSkeleton } from "@/components/PageSkeleton/PageSkeleton";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SidebarHeader />

        <div className="@container/main flex flex-1 flex-col gap-4 p-4 container mx-auto max-w-7xl">
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
