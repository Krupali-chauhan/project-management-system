import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewProjects() {

  const [projects, setProjects] = useState([]);

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

  return (

    <div style={container}>

      <h2 style={title}>All Projects</h2>

      <div style={card}>

        <table style={table}>

          <thead style={thead}>
            <tr>
              <th style={th}>Project Name</th>
              <th style={th}>Project Type</th>
              <th style={th}>Budget</th>
              <th style={th}>Deadline</th>
            </tr>
          </thead>

          <tbody>

            {projects.map((p,i)=>(
              <tr key={i} style={row}>
                <td style={td}>{p.projectName}</td>
                <td style={td}>{p.projectType}</td>
                <td style={td}>{p.budget}</td>
                <td style={td}>{p.deadline}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

const container = {
  padding:"40px",
  background:"#f3f4f6",
  minHeight:"100vh",
  fontFamily:"Arial"
};

const title = {
  marginBottom:"20px",
  textAlign:"center",
  color:"#1f2937"
};

const card = {
  background:"white",
  padding:"20px",
  borderRadius:"8px",
  boxShadow:"0 2px 8px rgba(0,0,0,0.1)",
  maxWidth:"900px",
  margin:"auto"
};

const table = {
  width:"100%",
  borderCollapse:"collapse"
};

const thead = {
  background:"#071941",
  color:"white"
};

const th = {
  padding:"12px",
  textAlign:"left",
  fontSize:"15px"
};

const td = {
  padding:"10px",
  borderBottom:"1px solid #e5e7eb"
};

const row = {
  transition:"0.2s"
};

export default ViewProjects;