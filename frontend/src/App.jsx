import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import ClientNavbar from "./components/layout/Navbar";
import ClientSidebar from "./components/layout/ClientSidebar";

import ClientDashboard from "./pages/client/ClientDashboard";
import CreateProject from "./pages/client/CreateProject";
import ViewSOW from "./pages/client/ViewSOW";
import SOWDetail from "./pages/client/SOWDetail";
function App() {

  return (

    <BrowserRouter>
   

      <ClientNavbar />

      <div style={{ display: "flex" }}>

        <ClientSidebar />

        <Routes>

          {/* default redirect */}
          <Route path="/" element={<Navigate to="/client/dashboard" />} />

          {/* client pages */}
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/create-project" element={<CreateProject />} />
          <Route path="/client/view-sow" element={<ViewSOW />} />
          <Route path="/client/sow-detail/:id" element={<SOWDetail />} />

        </Routes>

      </div>
 

    </BrowserRouter>

  );

}

export default App;