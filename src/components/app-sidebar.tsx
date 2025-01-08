"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { NAVIGATION_DATA, TEAMS_DATA, USER_DATA } from "@/data/constants";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={TEAMS_DATA} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NAVIGATION_DATA} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={USER_DATA} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
