import React, { useEffect, useState } from "react";

import SuperadminSidebar from "../../components/layout/SuperadminSidebar";
import axios from "axios";

function ViewUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    

      <div style={{ display: "flex" }}>

        <SuperadminSidebar />
    <div style={page}>
<br/>
<br/>
      {/* HEADER */}
      <div style={header}>
        <h1 style={title}>Client Users</h1>
        <p style={subtitle}>Manage all registered clients</p>
      </div>

      {/* TABLE CARD */}
      <div style={card}>

        <table style={table}>

          <thead>
            <tr style={thead}>
              <th style={th}>No</th>
              <th style={th}>User</th>
              <th style={th}>Email</th>
              <th style={th}>Phone</th>
              <th style={th}>City</th>
            </tr>
          </thead>

          <tbody>

            {users.map((u, index) => (

              <tr key={u._id} style={row}>

                <td style={td}>{index + 1}</td>

                <td style={userCell}>
                  <div style={avatar}>
                    {u.name?.charAt(0)}
                  </div>
                  {u.name}
                </td>

                <td style={td}>{u.email}</td>
                <td style={td}>{u.phone}</td>
                <td style={td}>{u.city}</td>

              </tr>

            ))}

          </tbody>

        </table>

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
  padding: "40px",
  fontFamily: "Segoe UI",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1557682250-33bd709cbe85')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const header = {
  marginBottom: "30px"
};

const title = {
  fontSize: "36px",
  fontWeight: "700",
  color: "#d8dbe1"
};

const subtitle = {
  color: "#eaeef4"
};

const card = {
  background: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  padding: "25px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const thead = {
  background: "linear-gradient(90deg,#6366f1,#4f46e5)"
};

const th = {
  padding: "14px",
  textAlign: "left",
  color: "white",
  fontSize: "20px"
};

const row = {
  transition: "0.2s"
};

const td = {
  padding: "16px",
  borderBottom: "1px solid #dce0e6",
  color: "#d7dfeb"
};

const userCell = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "16px",
  borderBottom: "1px solid #e2e8f0",
  color: "#dfe5ee"
};

const avatar = {
  width: "34px",
  height: "34px",
  borderRadius: "50%",
  background: "linear-gradient(135deg,#6366f1,#9333ea)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "600"
};

export default ViewUsers;