import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PMProjects() {

  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {

    const fetchProjects = async () => {
      try {

        const res = await axios.get(
          "http://localhost:5000/api/projectmanager/projects",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("PROJECTS:", res.data);

        setProjects(res.data);

      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchProjects();

  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h2>My Assigned Projects</h2>

      {projects.length === 0 ? (
        <p>No Projects Assigned</p>
      ) : (
        projects.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "15px",
              borderRadius: "8px"
            }}
          >
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p>Budget: ₹ {p.budget}</p>
            <p>Status: {p.status}</p>

            {/* 🔥 IMPORTANT BUTTON */}
            <button
              onClick={() => navigate(`/pm/milestones/${p._id}`)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                background: "#6366F1",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Manage Milestones
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default PMProjects;