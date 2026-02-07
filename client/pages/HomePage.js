import { useAuth } from "../contexts/authentication";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="app-wrapper">
      <h1 className="app-title">Blog Post App</h1>

      <button onClick={() => navigate("/post/create")}>
        Create Post
      </button>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default HomePage;
