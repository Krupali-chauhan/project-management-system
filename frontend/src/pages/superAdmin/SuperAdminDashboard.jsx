import { useNavigate } from "react-router-dom";

function SuperAdminDashboard() {

  const navigate = useNavigate();

  const layout = {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial"
  };

  const sidebar = {
    width: "220px",
    background: "#1e293b",
    color: "white",
    padding: "20px"
  };

  const menuItem = {
    margin: "15px 0",
    cursor: "pointer"
  };

  const main = {
    flex: 1,
    background: "#f1f5f9",
    padding: "30px"
  };

  const topbar = {
    background: "white",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between"
  };

  const cardContainer = {
    display: "flex",
    gap: "20px"
  };

  const card = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    flex: 1,
    boxShadow: "0 5px 10px rgba(0,0,0,0.1)"
  };

  const logoutBtn = {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer"
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={layout}>

      {/* Sidebar */}
      <div style={sidebar}>
        <h2>Admin Panel</h2>

        <div style={menuItem}>Dashboard</div>
        <div style={menuItem}>Manage Users</div>
        <div style={menuItem}>Projects</div>
        <div style={menuItem}>Reports</div>
        <div style={menuItem}>Settings</div>

      </div>

      {/* Main Content */}
      <div style={main}>

        {/* Top Bar */}
        <div style={topbar}>
          <h3>Super Admin Dashboard</h3>
          <button style={logoutBtn} onClick={logout}>Logout</button>
        </div>

        {/* Stats */}
        <div style={cardContainer}>

          <div style={card}>
            <h3>Total Users</h3>
            <p style={{fontSize:"24px"}}>0</p>
          </div>

          <div style={card}>
            <h3>Total Projects</h3>
            <p style={{fontSize:"24px"}}>0</p>
          </div>

          <div style={card}>
            <h3>Active Developers</h3>
            <p style={{fontSize:"24px"}}>0</p>
          </div>

          <div style={card}>
            <h3>Pending Tasks</h3>
            <p style={{fontSize:"24px"}}>0</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default SuperAdminDashboard;