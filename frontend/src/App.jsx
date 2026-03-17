import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ClientNavbar from "./components/layout/Navbar";
import ClientSidebar from "./components/layout/ClientSidebar";
import SuperadminSidebar from "./components/layout/Superadminsidebar";   // ← import karo (naam check kar lena)
// import ProjectManagerSidebar from "./components/layout/ProjectManagerSidebar"; // agar bana hai to
// import DeveloperSidebar from "./components/layout/DeveloperSidebar";
//            // agar bana hai to
import SuperAdminLayout from "./pages/superAdmin/SuperAdminLayout";
// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import ClientDashboard from "./pages/client/ClientDashboard";
import CreateProject from "./pages/client/CreateProject";
import MyProjects from "./pages/client/MyProjects";
import ViewSOW from "./pages/client/ViewSOW";
import SOWDetail from "./pages/client/SOWDetail";

import SuperAdminDashboard from "./pages/superAdmin/SuperAdminDashboard";
import AddProjectManager from "./pages/superAdmin/AddProjectManager";
import ViewProjectManagers from "./pages/superAdmin/ViewProjectManagers";
import EditProjectManager from "./pages/superAdmin/EditProjectManager";

// import ViewUsers from "./pages/superAdmin/ViewUsers";
import ViewProjects from "./pages/superAdmin/ViewProjects";
import EditDeveloper from "./pages/superAdmin/EditDeveloper";
// import ViewDeveloper from "./pages/superAdmin/ViewDeveloper";
import AddDeveloper from "./pages/superAdmin/AddDeveloper";

import PMDashboard from "./pages/projectManager/PMDashboard";


import DeveloperDashboard from "./pages/developer/DeveloperDashboard";
import ViewDevelopers from "./pages/superAdmin/ViewDeveloper";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public - no layout */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ─── CLIENT ─── (tumhara existing pattern) */}
        <Route
          path="/client/*"
          element={
            <>
              <ClientNavbar />
              <div style={{ display: "flex" }}>
                <ClientSidebar />
                <main style={{ flex: 1, padding: "20px" }}>
                  <Routes>
                    <Route path="dashboard" element={<ClientDashboard />} />
                    <Route path="create-project" element={<CreateProject />} />
                    <Route path="create-project/:id" element={<CreateProject />} />
                    <Route path="my-projects" element={<MyProjects />} />
                    <Route path="view-sow" element={<ViewSOW />} />
                    <Route path="sow-detail/:id" element={<SOWDetail />} />
                  </Routes>
                </main>
              </div>
            </>
          }
        />

        {/* ─── SUPER ADMIN ─── (client jaisa pattern) */}
     <Route path="/superAdmin" element={<SuperAdminLayout />}>
  <Route path="SuperAdminDashboard" element={<SuperAdminDashboard />} />
   <Route path="viewproject" element={<ViewProjects />} />
  <Route path="add-project-manager" element={<AddProjectManager />} />
   <Route path="view-project-manager" element={<ViewProjectManagers />} />
    <Route path="add-devloper" element={<AddDeveloper />} />

   <Route path="view-devloper" element={<ViewDevelopers />} />

   <Route path="edit-developer/:id" element={<EditDeveloper />} />
   <Route
 path="/superAdmin/edit-project-manager/:id"
 element={<EditProjectManager />}
/>
</Route>

        {/* ─── PROJECT MANAGER ─── */}
        <Route
          path="/pm/*"
          element={
            <>
              <ClientNavbar />
              <div style={{ display: "flex" }}>
                {/* <ProjectManagerSidebar />   agar bana hai to import karo */}
                <main style={{ flex: 1, padding: "20px" }}>
                  <Routes>
                    <Route path="pmdashboard" element={<PMDashboard />} />
                    <Route path="add-developer" element={<AddDeveloper />} />
                    {/* aur baki PM pages yahan add kar sakte ho */}
                  </Routes>
                </main>
              </div>
            </>
          }
        />

        {/* ─── DEVELOPER ─── */}
        <Route
          path="/developer/*"
          element={
            <>
              <ClientNavbar />
              <div style={{ display: "flex" }}>
                {/* <DeveloperSidebar />   agar bana hai to */}
                <main style={{ flex: 1, padding: "20px" }}>
                  <Routes>
                    <Route path="developer-dashboard" element={<DeveloperDashboard />} />
                    {/* aur baki developer pages */}
                  </Routes>
                </main>
              </div>
            </>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;