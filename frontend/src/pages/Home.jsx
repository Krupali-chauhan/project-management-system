import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {

  const navigate = useNavigate();

  return (

    <div className="home-container">

      <div className="home-card">

        <h1>Project Management System</h1>

        <p className="question">Are you a client?</p>

        <div className="btn-group">

          <button
            className="btn yes"
            onClick={() => navigate("/signup")}
          >
            YES
          </button>

          <button
            className="btn no"
            onClick={() => navigate("/login")}
          >
            NO
          </button>

        </div>

      </div>

    </div>

  );

}

export default Home;