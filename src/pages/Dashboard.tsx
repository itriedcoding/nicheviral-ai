import { useState, useEffect } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarRail, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Overview } from "@/components/dashboard/Overview";
import { Studio } from "@/components/dashboard/Studio";
import { Growth } from "@/components/dashboard/Growth";
import { Settings } from "@/components/dashboard/Settings";
import { Tools } from "@/components/dashboard/Tools";
import { LayoutDashboard, Video, TrendingUp, Settings as SettingsIcon, LogOut, Sparkles, Wrench } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useNavigate } from "react-router";
import { clearSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("overview");
  const navigate = useNavigate();
  
  // We need to get the user to pass to mutations if needed, or just for display
  // This query might fail if not authenticated, handled by boundary or redirect
  // For now we assume auth is handled by a wrapper or we check session
  
  const handleLogout = () => {
    clearSession();
    navigate("/");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar collapsible="icon">
          <SidebarHeader className="h-16 flex items-center justify-center border-b border-border/50">
            <div className="flex items-center gap-2 font-bold text-xl px-4 w-full">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="group-data-[collapsible=icon]:hidden">NicheViral AI</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activePage === "overview"} 
                  onClick={() => setActivePage("overview")}
                  tooltip="Overview"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activePage === "studio"} 
                  onClick={() => setActivePage("studio")}
                  tooltip="AI Studio"
                >
                  <Video className="h-4 w-4" />
                  <span>AI Studio</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activePage === "growth"} 
                  onClick={() => setActivePage("growth")}
                  tooltip="Growth & Analytics"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Growth</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activePage === "tools"} 
                  onClick={() => setActivePage("tools")}
                  tooltip="Creator Tools"
                >
                  <Wrench className="h-4 w-4" />
                  <span>Creator Tools</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activePage === "settings"} 
                  onClick={() => setActivePage("settings")}
                  tooltip="Settings"
                >
                  <SettingsIcon className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-border/50">
            <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium">User</span>
                <span className="text-xs text-muted-foreground">Pro Plan</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-2 justify-start text-muted-foreground hover:text-destructive group-data-[collapsible=icon]:justify-center"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2 group-data-[collapsible=icon]:mr-0" />
              <span className="group-data-[collapsible=icon]:hidden">Sign Out</span>
            </Button>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        
        <SidebarInset>
          <header className="flex h-16 items-center gap-2 border-b px-4 lg:px-6">
            <SidebarTrigger />
            <div className="flex-1" />
            {/* Add header actions here if needed */}
          </header>
          <main className="flex-1 overflow-y-auto">
            {activePage === "overview" && <Overview onNavigate={setActivePage} />}
            {activePage === "studio" && <Studio />}
            {activePage === "growth" && <Growth />}
            {activePage === "tools" && <Tools />}
            {activePage === "settings" && <Settings />}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}