import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";
import api from "../api";
import "../Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", email: "", password: "", avatar: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const signupData = {
        name: form.name,
        email: form.email,
        password: form.password
      };

      const response = await api.post("/auth/register", signupData);
      const data = response.data;
      console.log(data)
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      
      alert("Signup successful!");
      navigate("/events");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-bg">
      <div className="signup-card">
        <h2 className="highlight">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <label className="avatar-btn">
            Choose Avatar (Optional)
            <input type="file" name="avatar" accept="image/*" style={{ display: "none" }} onChange={handleChange} />
          </label>
          <button className="signup-btn" type="submit" disabled={loading}>{loading ? "Signing up..." : "Signup"}</button>
          <button className="google-btn" type="button" onClick={() => alert("Google Signup not implemented")}> <span style={{ marginRight: 8 }}>G</span> Signup with Google </button>
        </form>
        {error && <div style={{ color: "#ea4335", marginTop: 10 }}>{error}</div>}
        <div className="login-link"> Already have an account? <span onClick={() => navigate("/login")}>Log in</span> </div>
      </div>
    </div>
  );
};

export default Signup;