import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth.js";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="auth-card">
      <h1>Welcome</h1>
      <p className="dashboard-message">
        You are signed in as <span className="dashboard-email">{user?.email}</span>
      </p>
      <button type="button" onClick={handleLogout} className="secondary-button">
        Log out
      </button>
    </div>
  );
}

