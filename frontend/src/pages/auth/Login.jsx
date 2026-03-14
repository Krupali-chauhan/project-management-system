import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async () => {
  try {
    const data = await loginUser({ email, password });

    alert("Login Success");

    if (data.role === "admin") {
      navigate("/superAdmin/SuperAdminDashboard");
    } else if (data.role === "project_manager") {
      navigate("/projectManager/PMDashboard");
    } else if (data.role === "developer") {
      navigate("/developer/DeveloperDashboard");
    } else {
      navigate("/client/ClientDashboard");
    }

  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
  }
};

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
  Don't have an account?{" "}
  <span 
    style={{ color: "blue", cursor: "pointer" }}
    onClick={() => navigate("/signup")}
  >
    Signup (Only for Clients)
  </span>
</p>
    </div>
  );
}

export default Login;