import React, { useEffect, useState } from "react";
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

    <div style={container}>

      <h2 style={title}>All Users</h2>

      <div style={card}>

        <table style={table}>

          <thead style={thead}>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
            </tr>

          </thead>

          <tbody>

            {users.map((u,i)=>(
              <tr key={i} style={row}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.city}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

const container = {
  padding: "40px",
  background: "linear-gradient(135deg,#e3e6ff,#f7f8ff)",
  minHeight: "100vh",
  fontFamily: "Segoe UI"
};

const title = {
  marginBottom: "25px",
  fontSize: "28px",
  fontWeight: "600",
  color: "#2c2c54",
  letterSpacing: "1px"
};

const card = {
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(8px)",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
};

const table = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 10px"
};

const thead = {
  background: "#0d0b39",
  color: "white",
  borderRadius: "6px"
};

const th = {
  padding: "12px",
  textAlign: "left",
  fontSize: "15px"
};

const td = {
  padding: "12px",
  background: "#ffffff",
  borderRadius: "6px"
};

const row = {
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
};
export default ViewUsers;