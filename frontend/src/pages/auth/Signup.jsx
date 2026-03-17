// pages/auth/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../services/authService";
import "../../styles/signup.css";

function Signup() {
  
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneno: "",      // ← yaha phone nahi, phoneno
    company: "",
    city: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailPattern.test(form.email)) {
  alert("Please enter a valid email address");
  return;
}
  // Password length check frontend me hi
  if (form.password.length < 6) {
    alert("Password must be at least 6 characters long!");
    return; // backend pe mat bhej
  }
  if (!form.phoneno) {
  alert("Please enter your phone number");
  return;
}
const phonePattern = /^[0-9]{10}$/;
if (!phonePattern.test(form.phoneno)) {
  alert("Phone number must be 10 digits");
  return;
}
if (!form.company.trim()) {
  alert("Please enter your company name");
  return;
}

// City validation
if (!form.city.trim()) {
  alert("Please enter your city");
  return;
}


  // Optional: email format check (basic)
  if (!form.email.includes("@") || !form.email.includes(".")) {
    alert("Please enter a valid email address!");
    return;
  }

  // Optional: name check
  if (form.name.trim().length < 2) {
    alert("Full name must be at least 2 characters!");
    return;
  }

  try {
    const response = await signupUser(form);
    alert(response.data.message || "Signup Successful! Now login.");
    navigate("/login");
  } catch (err) {
    console.error("Signup frontend error:", err.response?.data || err);
    // Better error message from backend
    const errorMsg = err.response?.data?.message || err.response?.data?.error || "Signup Failed. Please try again.";
    alert(errorMsg);
  }
};

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Client Account</h2>

        <div className="form-group">
          <label>Full Name</label>
          <input name="name" placeholder="Enter full name" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input name="email" type="email" placeholder="Enter email" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter password" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input name="phoneno" placeholder="Enter phone number" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Company</label>
          <input name="company" placeholder="Enter company name" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>City</label>
          <input name="city" placeholder="Enter city" onChange={handleChange} />
        </div>

        <button className="signup-btn" onClick={handleSignup}>
          Create Account
        </button>

        <p className="login-link">
          Already have account? <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
