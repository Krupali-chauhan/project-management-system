import React,{useEffect,useState} from "react";
import SuperadminSidebar from "../../components/layout/SuperadminSidebar";
import axios from "axios";

function ManageDeveloper(){

const [developers,setDevelopers] = useState([]);
const [editDev,setEditDev] = useState(null);

const [form,setForm] = useState({
 name:"",
 email:"",
 phoneno:"",
 city:""
});

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
 catch(err){
  console.log(err);
 }

};


const deleteDeveloper = async(id)=>{

 if(!window.confirm("Delete this developer?")) return;

 try{
  await axios.delete(
   `http://localhost:5000/api/admin/delete-developer/${id}`
  );

  fetchDevelopers();

 }catch(err){
  console.log(err);
 }

};


const openEdit = (dev)=>{

 setEditDev(dev._id);

 setForm({
  name:dev.name,
  email:dev.email,
  phoneno:dev.phoneno,
  city:dev.city
 });

};


const handleChange = (e)=>{

 setForm({
  ...form,
  [e.target.name]:e.target.value
 });

};


const updateDeveloper = async()=>{

 try{

  await axios.put(
   `http://localhost:5000/api/admin/update-developer/${editDev}`,
   form
  );

  setEditDev(null);

  fetchDevelopers();

 }catch(err){
  console.log(err);
 }

};


return(
    <>
    

      <div style={{ display: "flex" }}>

        <SuperadminSidebar />

<div style={container}>

<div style={card}>

<h2 style={title}>Developer Management</h2>

<table style={table}>

<thead>

<tr>
<th style={th}>Name</th>
<th style={th}>Email</th>
<th style={th}>Phone</th>
<th style={th}>City</th>
<th style={th}>Action</th>
</tr>

</thead>

<tbody>

{developers.map((dev)=>(

<tr key={dev._id} style={row}>

<td style={td}>{dev.name}</td>
<td style={td}>{dev.email}</td>
<td style={td}>{dev.phoneno}</td>
<td style={td}>{dev.city}</td>

<td style={td}>

<button
style={editBtn}
onClick={()=>openEdit(dev)}
>
Edit
</button>

<button
style={deleteBtn}
onClick={()=>deleteDeveloper(dev._id)}
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>


{editDev && (

<div style={popup}>

<div style={popupCard}>

<h3 style={{marginBottom:"15px"}}>Update Developer</h3>

<input
name="name"
value={form.name}
onChange={handleChange}
placeholder="Name"
style={input}
/>

<input
name="email"
value={form.email}
onChange={handleChange}
placeholder="Email"
style={input}
/>

<input
name="phoneno"
value={form.phoneno}
onChange={handleChange}
placeholder="Phone"
style={input}
/>

<input
name="city"
value={form.city}
onChange={handleChange}
placeholder="City"
style={input}
/>

<button
style={updateBtn}
onClick={updateDeveloper}
>
Update
</button>

<button
style={cancelBtn}
onClick={()=>setEditDev(null)}
>
Cancel
</button>

</div>

</div>

)}

</div>
</div>
</>

);

}



const container={
flex:1,
minHeight:"100vh",
padding:"40px",
background:"linear-gradient(135deg,#667eea,#764ba2)",
display:"flex",
justifyContent:"center",
alignItems:"center"
};

const card={
background:"white",
padding:"35px",
borderRadius:"12px",
width:"90%",
maxWidth:"900px",
boxShadow:"0 10px 25px rgba(0,0,0,0.2)"
};

const title={
textAlign:"center",
marginBottom:"25px",
fontSize:"26px",
fontWeight:"bold",
color:"#333"
};

const table={
width:"100%",
borderCollapse:"collapse"
};

const th={
background:"#4f46e5",
color:"white",
padding:"12px",
border:"1px solid #ddd"
};

const row={
transition:"0.2s"
};

const td={
padding:"12px",
border:"1px solid #ddd",
textAlign:"center"
};

const editBtn={
background:"#f59e0b",
color:"white",
border:"none",
padding:"7px 14px",
borderRadius:"5px",
marginRight:"5px",
cursor:"pointer"
};

const deleteBtn={
background:"#ef4444",
color:"white",
border:"none",
padding:"7px 14px",
borderRadius:"5px",
cursor:"pointer"
};

const popup={
position:"fixed",
top:"0",
left:"0",
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.5)",
display:"flex",
justifyContent:"center",
alignItems:"center"
};

const popupCard={
background:"white",
padding:"30px",
borderRadius:"10px",
width:"320px",
display:"flex",
flexDirection:"column",
boxShadow:"0 10px 20px rgba(0,0,0,0.3)"
};

const input={
marginBottom:"10px",
padding:"10px",
borderRadius:"5px",
border:"1px solid #ccc"
};

const updateBtn={
background:"#4f46e5",
color:"white",
border:"none",
padding:"10px",
borderRadius:"5px",
marginBottom:"5px",
cursor:"pointer"
};

const cancelBtn={
background:"#6b7280",
color:"white",
border:"none",
padding:"10px",
borderRadius:"5px",
cursor:"pointer"
};

export default ManageDeveloper;