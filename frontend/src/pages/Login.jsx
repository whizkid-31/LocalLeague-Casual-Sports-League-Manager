import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login as loginRequest } from "../api/auth.js";
import { useAuth } from "../hooks/useAuth.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { token, user } = await loginRequest(email, password);
      login(token, user);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.payload?.error ?? err.message ?? "Unable to login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h1>Login</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
          />
        </label>
        {error ? <p className="auth-error">{error}</p> : null}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="auth-footer">
        Need an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

