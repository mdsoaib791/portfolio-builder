import { AppSidebar } from "@/components/dashboard/app-sidebar"
import DashboardTopbar from "@/components/dashboard/dashboard-top-bar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="relative flex-1">
                <DashboardTopbar />
                <div className="flex-1 overflow-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}
