import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import SuperadminSidebar from "../../components/layout/SuperadminSidebar";
import axios from "axios";

function ViewProjects() {

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects");
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // SEARCH FILTER (FIXED)
  const filteredProjects = projects.filter((p) =>
    (p.projectName || "").toLowerCase().includes(search.toLowerCase())
  );

  // TOTAL BUDGET
  const totalBudget = projects.reduce(
    (sum, p) => sum + Number(p.budget || 0),
    0
  );

  return (
    <>
          <Navbar />
    
          <div style={{ display: "flex" }}>
    
            <SuperadminSidebar />
    <div style={page}>

      <div style={container}>
        <br/>
        <br/>

        {/* HEADER */}
        <div style={header}>
          <h1 style={title}>View Projects</h1>

          <input
            type="text"
            placeholder="Search project..."
            style={searchBox}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* STATS */}
        <div style={statsContainer}>

          <div style={statCard}>
            <h3 style={statNumber}>{projects.length}</h3>
            <p style={statLabel}>Total Projects</p>
          </div>

          <div style={statCard}>
            <h3 style={statNumber}>₹ {totalBudget}</h3>
            <p style={statLabel}>Total Budget</p>
          </div>

        </div>

        {/* TABLE */}
        <div style={card}>

          <table style={table}>

            <thead>
              <tr style={thead}>
                <th style={th}>Project</th>
                <th style={th}>Type</th>
                <th style={th}>Budget</th>
                <th style={th}>Deadline</th>
              </tr>
            </thead>

            <tbody>

              {filteredProjects.map((p, i) => (
                <tr key={i} style={row}>

                  <td style={projectCell}>
                    <div style={avatar}>
                      {(p.projectName || "P").charAt(0)}
                    </div>
                    {p.projectName || "No Name"}
                  </td>

                  <td>
                    <span style={typeBadge}>
                      {p.projectType || "-"}
                    </span>
                  </td>

                  <td>
                    <span style={budgetBadge}>
                      ₹ {p.budget || 0}
                    </span>
                  </td>

                  <td style={deadline}>
                    {p.deadline || "-"}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
    </div>
    </>
  );
}


/* ---------- STYLES ---------- */

const page = {
  flex: 1,
  minHeight: "100vh",
  background: "#f1f5f9",
  padding: "40px",
  fontFamily: "Segoe UI",
  display: "flex",
  justifyContent: "center"
};

const container = {
  width: "100%",
  maxWidth: "1000px"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

const title = {
  fontSize: "30px",
  fontWeight: "600",
  color: "#1e293b"
};

const searchBox = {
  padding: "10px 14px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  width: "220px"
};

const statsContainer = {
  display: "flex",
  gap: "20px",
  marginBottom: "20px"
};

const statCard = {
  flex: 1,
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
};

const statNumber = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#6366f1"
};

const statLabel = {
  color: "#64748b",
  marginTop: "4px"
};

const card = {
  background: "white",
  borderRadius: "10px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  overflow: "hidden"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const thead = {
  background: "#6366f1",
  color: "white"
};

const th = {
  padding: "14px",
  textAlign: "left",
  fontSize: "13px"
};

const row = {
  borderBottom: "1px solid #f1f5f9"
};

const projectCell = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "14px",
  fontWeight: "500"
};

const avatar = {
  width: "30px",
  height: "30px",
  borderRadius: "6px",
  background: "#6366f1",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px"
};

const typeBadge = {
  background: "#eef2ff",
  color: "#4338ca",
  padding: "5px 10px",
  borderRadius: "6px",
  fontSize: "12px"
};

const budgetBadge = {
  background: "#ecfdf5",
  color: "#059669",
  padding: "5px 10px",
  borderRadius: "6px",
  fontSize: "12px"
};

const deadline = {
  padding: "14px",
  color: "#475569"
};

export default ViewProjects;