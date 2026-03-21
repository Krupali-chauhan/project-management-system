// src/layout/PMLayout.jsx
import { Outlet } from "react-router-dom";
import ClientNavbar from "./Navbar";
import ProjectManagerSidebar from "./ProjectManagerSidebar";

function PMLayout() {
  return (
    <>
      <ClientNavbar />
      <div style={{ display: "flex" }}>
        <ProjectManagerSidebar />
        <main style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default PMLayout;