import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import ClientNavbar from "./components/layout/Navbar";
import ClientSidebar from "./components/layout/ClientSidebar";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import ClientDashboard from "./pages/client/ClientDashboard";
import CreateProject from "./pages/client/CreateProject";
import ViewSOW from "./pages/client/ViewSOW";
import SOWDetail from "./pages/client/SOWDetail";

import SuperAdminDashboard from "./pages/superAdmin/SuperAdminDashboard";
import ViewUsers from "./pages/superAdmin/ViewUsers";
import ViewProjects from "./pages/superAdmin/ViewProjects";
import ViewDeveloper from "./pages/superAdmin/ViewDeveloper";

import PMDashboard from "./pages/projectManager/PMDashboard";
import AddDeveloper from "./pages/projectManager/AddDeveloper";

import DeveloperDashboard from "./pages/developer/DeveloperDashboard";

function App() {

  return (

  <BrowserRouter>

      <Routes>

        {/* PUBLIC PAGES (NO NAVBAR) */}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


        {/* CLIENT LAYOUT */}

        <Route
          path="/client/*"
          element={
            <>
              <ClientNavbar />

              <div style={{ display: "flex" }}>
                <ClientSidebar />

                <Routes>
                  <Route path="dashboard" element={<ClientDashboard />} />
                  <Route path="create-project" element={<CreateProject />} />
                  <Route path="view-sow" element={<ViewSOW />} />
                  <Route path="sow-detail/:id" element={<SOWDetail />} />
                </Routes>
              </div>
            </>
          }
        />


        {/* SUPER ADMIN */}

        <Route
          path="/superAdmin/SuperAdminDashboard"
          element={
            <>
              <ClientNavbar />
              <SuperAdminDashboard />
            </>
          }
        />

        <Route
          path="/view-users"
          element={
            <>
              <ClientNavbar />
              <ViewUsers />
            </>
          }
        />

        <Route
          path="/view-projects"
          element={
            <>
              <ClientNavbar />
              <ViewProjects />
            </>
          }
        />

        <Route
          path="/viewDeveloper"
          element={
            <>
              <ClientNavbar />
              <ViewDeveloper />
            </>
          }
        />


        {/* PROJECT MANAGER */}

        <Route
          path="/pm/pmdashboard"
          element={
            <>
              <ClientNavbar />
              <PMDashboard />
            </>
          }
        />

        <Route
          path="/pm/add-developer"
          element={
            <>
              <ClientNavbar />
              <AddDeveloper />
            </>
          }
        />


        {/* DEVELOPER */}

        <Route
          path="/developer/DeveloperDashboard"
          element={
            <>
              <ClientNavbar />
              <DeveloperDashboard />
            </>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;