import React, { Suspense, useState } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { SidebarHeader } from "./SidebarHeader";
import { PageSkeleton } from "@/components/PageSkeleton/PageSkeleton";
import { Outlet } from "react-router-dom";
import AIChatAssistant from "@/components/AIChatAssistant/AIChatAssistant";

export function DashboardLayout() {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  return (
    <>
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
          <SidebarHeader onOpenAIChat={() => setIsAIChatOpen(true)} />

          <div className="@container/main flex flex-1 flex-col gap-4 p-4 container mx-auto max-w-7xl">
            <Suspense fallback={<PageSkeleton />}>
              <Outlet />
            </Suspense>
          </div>
        </SidebarInset>
      </SidebarProvider>

      {/* AI Chat Assistant */}
      <AIChatAssistant isOpen={isAIChatOpen} onOpenChange={setIsAIChatOpen} />
    </>
  );
}
