import React,{useState} from "react";
import axios from "axios";

function AddProjectManager(){

  const [form,setForm] = useState({
    name:"",
    email:"",
    phone:"",
    gender:"",
    salary:""
  });

  const handleChange=(e)=>{

    setForm({
      ...form,
      [e.target.name]:e.target.value
    });

  };

  const handleSubmit=async(e)=>{

    e.preventDefault();

    try{

      const res = await axios.post(
        "http://localhost:5000/api/admin/add-project-manager",
        form
      );

      alert(res.data.message);

    }
    catch(error){

      console.log(error);
      alert("Error adding project manager");

    }

  };

  return(

    <div style={container}>

      <div style={card}>

      <h2 style={title}>Add Project Manager</h2>

      <form onSubmit={handleSubmit} style={formStyle}>

        <input style={input} name="name" placeholder="Name" onChange={handleChange}/>

        <input style={input} name="email" placeholder="Email" onChange={handleChange}/>

        <input style={input} name="phone" placeholder="Phone" onChange={handleChange}/>

        <select style={input} name="gender" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input style={input} name="salary" placeholder="Salary" onChange={handleChange}/>

        <button style={button} type="submit">
          Add Project Manager
        </button>

      </form>

      </div>

    </div>

  );

}

const container={
  background:"#f3f4f6",
  minHeight:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
};

const card={
  background:"white",
  padding:"30px",
  borderRadius:"10px",
  boxShadow:"0 4px 10px rgba(0,0,0,0.1)",
  width:"350px"
};

const title={
  textAlign:"center",
  marginBottom:"20px",
  color:"#333"
};

const formStyle={
  display:"flex",
  flexDirection:"column",
  gap:"12px"
};

const input={
  padding:"10px",
  borderRadius:"5px",
  border:"1px solid #ccc",
  fontSize:"14px"
};

const button={
  padding:"10px",
  background:"#2563eb",
  color:"white",
  border:"none",
  borderRadius:"5px",
  cursor:"pointer",
  fontSize:"15px"
};

export default AddProjectManager;