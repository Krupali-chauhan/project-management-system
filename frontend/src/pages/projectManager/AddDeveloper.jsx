import React,{useState} from "react";
import axios from "axios";
import ProjectManagerSidebar from "../../components/layout/ProjectManagerSidebar";

function AddDeveloper(){

 const [form,setForm] = useState({
  name:"",
  email:"",
  phoneno:"",
  city:""
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

   await axios.post("http://localhost:5000/api/admin/add-developer",form);

   alert("Developer Added Successfully");

   setForm({
    name:"",
    email:"",
    phoneno:"",
    city:""
   });

  }catch(err){

   alert("Error");

  }

 };

 return(
    <>
      <div style={{ display: "flex" }}>

        <ProjectManagerSidebar />

  <div style={styles.container}>

   <h2 style={styles.title}>Add Developer</h2>

   <form onSubmit={handleSubmit} style={styles.form}>

    <input
     type="text"
     name="name"
     placeholder="Enter Name"
     value={form.name}
     onChange={handleChange}
     style={styles.input}
    />

    <input
     type="email"
     name="email"
     placeholder="Enter Email"
     value={form.email}
     onChange={handleChange}
     style={styles.input}
    />

    <input
     type="text"
     name="phoneno"
     placeholder="Enter Phone Number"
     value={form.phoneno}
     onChange={handleChange}
     style={styles.input}
    />

    <input
     type="text"
     name="city"
     placeholder="Enter City"
     value={form.city}
     onChange={handleChange}
     style={styles.input}
    />

    <button type="submit" style={styles.button}>
      Add Developer
    </button>

   </form>

  </div>
  </div>
  </>

 );

}

const styles={

 container:{
  width:"400px",
  margin:"60px auto",
  padding:"30px",
  background:"#fff",
  borderRadius:"10px",
  boxShadow:"0 0 10px rgba(0,0,0,0.2)",
  textAlign:"center"
 },

 title:{
  marginBottom:"20px"
 },

 form:{
  display:"flex",
  flexDirection:"column"
 },

 input:{
  margin:"10px 0",
  padding:"10px",
  fontSize:"16px",
  border:"1px solid #ccc",
  borderRadius:"5px"
 },

 button:{
  padding:"10px",
  background:"#1976d2",
  color:"#fff",
  border:"none",
  borderRadius:"5px",
  fontSize:"16px",
  cursor:"pointer"
 }

};

export default AddDeveloper;