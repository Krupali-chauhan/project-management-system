import React, { useEffect, useState } from "react";
import axios from "axios";

function AssignDevelopers() {
  const [devs, setDevs] = useState([]);
  const [myDevs, setMyDevs] = useState([]);

  const token = localStorage.getItem("token");

  const fetchAllDevs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/developers",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setDevs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyDevs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/my-developers",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMyDevs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllDevs();
    fetchMyDevs();
  }, []);

  const assignDev = async (id) => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/assign-developer",
        { developerId: id },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Assigned Successfully");
      fetchMyDevs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "30px", background: "#f5f7fb", minHeight: "100vh" }}>
      
      <h1 style={{ marginBottom: "30px", color: "#333" }}>
        Assign Developers
      </h1>

      <div style={{ display: "flex", gap: "30px" }}>

        {/* ALL DEVELOPERS */}
        <div style={{
          flex: 1,
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ marginBottom: "20px", color: "#444" }}>
            All Developers
          </h2>

          {devs.length === 0 ? (
            <p>No Developers Found</p>
          ) : (
            devs.map((dev) => (
              <div key={dev._id} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                background: "#f9fafc"
              }}>
                <span style={{ fontWeight: "500" }}>{dev.name}</span>

                <button
                  onClick={() => assignDev(dev._id)}
                  style={{
                    background: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Assign
                </button>
              </div>
            ))
          )}
        </div>

        {/* MY DEVELOPERS */}
        <div style={{
          flex: 1,
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ marginBottom: "20px", color: "#444" }}>
            My Developers
          </h2>

          {myDevs.length === 0 ? (
            <p>No Assigned Developers</p>
          ) : (
            myDevs.map((dev) => (
              <div key={dev._id} style={{
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                background: "#e8f5e9",
                fontWeight: "500"
              }}>
                {dev.name}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default AssignDevelopers;