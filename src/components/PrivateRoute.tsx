import { Navigate, Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./routines/app_sidebar";

function PrivateRoute() {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  ) : <Navigate to="/login" replace />;
}

export default PrivateRoute;
