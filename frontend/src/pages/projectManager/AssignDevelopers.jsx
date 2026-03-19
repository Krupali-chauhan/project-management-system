// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function AssignDevelopers() {
//   const [devs, setDevs] = useState([]);
//   const [myDevs, setMyDevs] = useState([]);

//   const token = localStorage.getItem("token");

//   const fetchAllDevs = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/auth/developers",
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
//       setDevs(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchMyDevs = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/auth/my-developers",
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
//       setMyDevs(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchAllDevs();
//     fetchMyDevs();
//   }, []);

//   const assignDev = async (id) => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/auth/assign-developer",
//         { developerId: id },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       alert("Assigned Successfully");
//       fetchMyDevs();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div style={{ padding: "30px", background: "#f5f7fb", minHeight: "100vh" }}>
      
//       <h1 style={{ marginBottom: "30px", color: "#333" }}>
//         Assign Developers
//       </h1>

//       <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>

//         {/* ALL DEVELOPERS */}
//         <div style={{
//           flex: 1,
//           background: "#fff",
//           padding: "20px",
//           borderRadius: "10px",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//           maxHeight: "300px",
//           overflowY: "auto"
//         }}>
//           <h2 style={{ marginBottom: "20px", color: "#444" }}>
//             All Developers
//           </h2>

//           {devs.length === 0 ? (
//             <p>No Developers Found</p>
//           ) : (
//             devs.map((dev) => (
//               <div key={dev._id} style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 padding: "10px",
//                 marginBottom: "10px",
//                 borderRadius: "8px",
//                 background: "#f9fafc"
//               }}>
//                 <div>
//   <div><b>{dev.name}</b></div>
//   <div style={{ fontSize: "13px", color: "#555" }}>{dev.email}</div>
//   <div style={{ fontSize: "13px" }}>📞 {dev.phoneno}</div>
//   <div style={{ fontSize: "13px" }}>🏢 {dev.department}</div>
//   <div style={{ fontSize: "13px" }}>📍 {dev.city}</div>
// </div>

//                 <button
//   onClick={() => assignDev(dev._id)}
//   disabled={myDevs.some(d => d._id === dev._id)}
//                   style={{
//   background: myDevs.some(d => d._id === dev._id) ? "#9e9e9e" : "#4CAF50",
//   color: "#fff",
//   border: "none",
//   padding: "6px 12px",
//   borderRadius: "5px",  
//   cursor: myDevs.some(d => d._id === dev._id) ? "not-allowed" : "pointer"
// }}
//                 >
//                   Assign
//                 </button>
//               </div>
//             ))
//           )}
//         </div>

//         {/* MY DEVELOPERS */}
//         <div style={{
//           flex: 1,
//           background: "#fff",
//           padding: "20px",
//           borderRadius: "10px",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//           maxHeight: "300px",
//           overflowY: "auto"
//         }}>
//           <h2 style={{ marginBottom: "20px", color: "#444" }}>
//             My Developers
//           </h2>

//           {myDevs.length === 0 ? (
//             <p>No Assigned Developers</p>
//           ) : (
//             myDevs.map((dev) => (
//               <div key={dev._id} style={{
//                 padding: "10px",
//                 marginBottom: "10px",
//                 borderRadius: "8px",
//                 background: "#e8f5e9",
//                 fontWeight: "500"
//               }}>
//                 <div style={{ display: "flex", justifyContent: "space-between" }}>
  
//   <div>
//     <div><b>{dev.name}</b></div>
//     <div style={{ fontSize: "13px" }}>{dev.email}</div>
//   </div>

//   <button
//     style={{
//       background: "#f44336",
//       color: "#fff",
//       border: "none",
//       padding: "5px 10px",
//       borderRadius: "5px",
//       cursor: "pointer"
//     }}
//   >
//     Remove
//   </button>

// </div>
//               </div>
//             ))
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

// export default AssignDevelopers;

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

  const removeDev = async (id) => {

  const confirm = window.confirm("Are you sure to remove developer under you?");

  if (!confirm) return;

  try {

    await axios.post(
      "http://localhost:5000/api/auth/remove-developer",
      { developerId: id },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    alert("Removed Successfully");

    fetchMyDevs();   // refresh my devs
    fetchAllDevs();  // refresh all devs (important 🔥)

  } catch (err) {
    console.error(err);
  }

};

  return (
    <div style={{ padding: "30px", background: "#f5f7fb", minHeight: "100vh" }}>
      
      <h1 style={{ marginBottom: "30px", color: "#333" }}>
        Assign Developers
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>

        {/* ALL DEVELOPERS */}
        <div style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          maxHeight: "300px",
          overflowY: "auto"
        }}>
          <h2 style={{ marginBottom: "20px", color: "#444" }}>
            All Developers
          </h2>

          {devs.length === 0 ? (
            <p>No Developers Found</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              
              <thead>
                <tr style={{ background: "#eee", textAlign: "left" }}>
                  <th style={{ padding: "8px" }}>Name</th>
                  <th style={{ padding: "8px" }}>Email</th>
                  <th style={{ padding: "8px" }}>Phone</th>
                  <th style={{ padding: "8px" }}>Department</th>
                  <th style={{ padding: "8px" }}>City</th>
                  <th style={{ padding: "8px" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {devs.map((dev) => (
                  <tr key={dev._id} style={{ borderBottom: "1px solid #ddd" }}>
                    
                    <td style={{ padding: "8px" }}>{dev.name}</td>
                    <td style={{ padding: "8px" }}>{dev.email}</td>
                    <td style={{ padding: "8px" }}>{dev.phoneno}</td>
                    <td style={{ padding: "8px" }}>{dev.department}</td>
                    <td style={{ padding: "8px" }}>{dev.city}</td>

                    <td style={{ padding: "8px" }}>
                      <button
                        onClick={() => assignDev(dev._id)}
                        disabled={myDevs.some(d => d._id === dev._id)}
                        style={{
                          background: myDevs.some(d => d._id === dev._id) ? "#9e9e9e" : "#4CAF50",
                          color: "#fff",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "5px",
                          cursor: myDevs.some(d => d._id === dev._id) ? "not-allowed" : "pointer"
                        }}
                      >
                        {myDevs.some(d => d._id === dev._id) ? "Assigned" : "Assign"}
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>

        {/* MY DEVELOPERS */}
        <div style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          maxHeight: "300px",
          overflowY: "auto"
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
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  
                  <div>
                    <div><b>{dev.name}</b></div>
                    <div style={{ fontSize: "13px" }}>{dev.email}</div>
                  </div>

                  <button
                    onClick={() => removeDev(dev._id)}
                    style={{
                      background: "#f44336",
                      color: "#fff",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default AssignDevelopers;