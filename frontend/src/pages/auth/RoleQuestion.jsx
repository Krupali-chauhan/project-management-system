import { useNavigate } from "react-router-dom";

function RoleQuestion() {
  const navigate = useNavigate();

  const containerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4f46e5, #06b6d4)"
  };

  const cardStyle = {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    width: "350px"
  };

  const buttonStyle = {
    padding: "10px 25px",
    border: "none",
    borderRadius: "6px",
    margin: "10px",
    fontSize: "16px",
    cursor: "pointer"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>
          Are you a Client?
        </h2>

        <button
          onClick={() => navigate("/signup")}
          style={{ ...buttonStyle, background: "#22c55e", color: "white" }}
        >
          Yes
        </button>

        <button
          onClick={() => navigate("/login")}
          style={{ ...buttonStyle, background: "#3b82f6", color: "white" }}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default RoleQuestion;