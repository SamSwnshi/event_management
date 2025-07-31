import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";
import api from "../api";
import "../Signup.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });
      const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      alert("Login successful!");
      navigate("/events");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-bg">
      <div className="signup-card">
        <h2 className="highlight">Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button className="signup-btn" type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
          <button className="google-btn" type="button" onClick={() => alert("Google Login not implemented")}> <span style={{ marginRight: 8 }}>G</span> Login with Google </button>
        </form>
        {error && <div style={{ color: "#ea4335", marginTop: 10 }}>{error}</div>}
        <div className="login-link"> Don't have an account? <span onClick={() => navigate("/signup")}>Sign up</span> </div>
      </div>
    </div>
  );
};

export default Login;