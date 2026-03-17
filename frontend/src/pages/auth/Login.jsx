import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import "../../styles/login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });
      const userData = response.data; // backend se aa raha data

      // LocalStorage me save kar rahe hain (sab roles ke liye common)
      localStorage.setItem("user", JSON.stringify(userData));
      if (userData.token) {
        localStorage.setItem("token", userData.token);
      }

      alert("Login Successful!");

      // Role ke hisaab se redirect
      const role = userData.role?.toLowerCase(); // case insensitive

      if (role === "superadmin" || role === "admin") {
        navigate("/superAdmin/SuperAdminDashboard");
      } else if (role === "projectmanager") {
        navigate("/pm/pmdashboard");
      } else if (role === "developer") {
        navigate("/developer/developer-dashboard");
      } else if (role === "client") {
        navigate("/client/Dashboard");
      } else {
        alert("Unknown role detected. Contact support.");
        navigate("/login");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Invalid Email or Password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* LOGO

        <img
          src="/images/lowLix1.png"
          alt="logo"
          className="login-logo"
        /> */}
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())} // extra safety
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
        <p className="signup-link">
          Don't have an account?
          <span onClick={() => navigate("/signup")}> Signup (Only for Clients)</span>
        </p>
      </div>
    </div>
  );
}

export default Login;