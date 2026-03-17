import { Outlet } from "react-router-dom";
import ClientNavbar from "../../components/layout/Navbar";
import SuperadminSidebar from "../../components/layout/Superadminsidebar";

function SuperAdminLayout() {
  return (
    <>
      <ClientNavbar />
      <div style={{ display: "flex" }}>
        <SuperadminSidebar />
        <main style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default SuperAdminLayout;