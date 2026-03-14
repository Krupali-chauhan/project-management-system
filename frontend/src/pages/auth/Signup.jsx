import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneno: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      alert(res.data.message);
      setFormData({
      name: "",
      email: "",
      phoneno: "",
      password: "",
      confirmPassword: ""
    });

    // ✅ Redirect to Login page
    navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <>
    <style>
      {`
        .form-control::placeholder {
          color: white !important;
          opacity: 1;
        }
        .custom-input,button {
    background: transparent !important;
    box-shadow: 0 0 10px rgba(255,255,255,0.8) !important;
    border: 1px solid white !important;
  }

  .custom-input,button:focus {
    box-shadow: 0 0 20px rgba(255,255,255,1) !important;
    border: 1px solid white !important;
  }
      `}
    </style>
    <div
    
    style={{
      backgroundImage: "url('/images/b2.avif')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
      
    }}
  >
    <div style={{ width: "400px", margin: "50px auto" }}>
      <h2 className="text-center mb-4" style={{color:"white"}}>Client Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className="form-control bg-transparent text-white border-light custom-input"
          placeholder="Full Name"
          onChange={handleChange}
          style={{
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.95)"
  }}
          required
        /><br />

        <input
          type="email"
          name="email"
          className="form-control bg-transparent text-white border-light custom-input"
          placeholder="Email"
          onChange={handleChange}
          required
        /><br />

        <input
          type="text"
          name="phoneno"
          className="form-control bg-transparent text-white border-light custom-input"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        /><br />

        <input
          type="password"
          name="password"
          className="form-control bg-transparent text-white border-light custom-input"
          placeholder="Password"
          onChange={handleChange}
          required
        /><br />

        <input
          type="password"
          name="confirmPassword"
          className="form-control bg-transparent text-white border-light custom-input"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        /><br />

        <button type="submit" className="btn  w-100" style={{color:"white",borderColor:"white"}}>Register</button>
        <center><h4 style={{ color: "white", marginTop: "15px",fontSize:"80%"}}>Already have an account?{" "}
          <Link to="/login" style={{ color: "white", textDecoration: "underline" }}>Sign in</Link>
        </h4></center>
      </form>
    </div>
    </div>
    </>
  );
}

export default Signup;