import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signup as signupRequest, login as loginRequest } from "../api/auth.js";
import { useAuth } from "../hooks/useAuth.js";

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      await signupRequest(email, password);
      const { token, user } = await loginRequest(email, password);
      login(token, user);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.payload?.error ?? err.message ?? "Unable to sign up.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h1>Create Account</h1>
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
            autoComplete="new-password"
            minLength={8}
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            autoComplete="new-password"
            minLength={8}
          />
        </label>
        {error ? <p className="auth-error">{error}</p> : null}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Sign up"}
        </button>
      </form>
      <p className="auth-footer">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

