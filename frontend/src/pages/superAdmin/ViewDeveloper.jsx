import React,{useEffect,useState} from "react";

import SuperadminSidebar from "../../components/layout/SuperadminSidebar";
import axios from "axios";

function ViewDeveloper(){

 const [developers,setDevelopers] = useState([]);

 useEffect(()=>{

  fetchDevelopers();

 },[]);


 const fetchDevelopers = async()=>{

  try{

   const res = await axios.get(
    "http://localhost:5000/api/admin/view-developers"
   );

   setDevelopers(res.data);

  }
  catch(error){

   console.log(error);

  }

 };


 return(
    <>
               
            
                  <div style={{ display: "flex" }}>
            
                    <SuperadminSidebar />

  <div style={container}>
    <br/>
    <br/>

   <div style={card}>

    <h2 style={title}>Developer List</h2>

    <table style={table}>

     <thead>

      <tr>

       <th style={th}>Name</th>
       <th style={th}>Email</th>
       <th style={th}>Phone</th>
       <th style={th}>City</th>

      </tr>

     </thead>

     <tbody>

      {developers.map((dev)=>(

       <tr key={dev._id}>

        <td style={td}>{dev.name}</td>
        <td style={td}>{dev.email}</td>
        <td style={td}>{dev.phoneno}</td>
        <td style={td}>{dev.city}</td>

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

const container = {
  flex: 1,
  background: "#f3f4f6",
  minHeight: "100vh",
  padding: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start"
};

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  width: "900px"
};

const title={
 textAlign:"center",
 marginBottom:"20px",
 color:"#333"
};

const table={
 width:"100%",
 borderCollapse:"collapse"
};

const th={
 background:"#2563eb",
 color:"white",
 padding:"10px",
 border:"1px solid #ddd"
};

const td={
 padding:"10px",
 border:"1px solid #ddd",
 textAlign:"center"
};

export default ViewDeveloper;