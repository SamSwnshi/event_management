import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", avatar: null });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Signup submitted!");
  };

  return (
    <div className="signup-bg">
      <header className="signup-header">
        <span className="highlight">The Social Hub</span>
        <nav>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Signup</button>
        </nav>
      </header>
      <div className="signup-card">
        <h2 className="highlight">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <label className="avatar-btn">Choose Avatar<input type="file" name="avatar" accept="image/*" style={{ display: "none" }} onChange={handleChange} /></label>
          <button className="signup-btn" type="submit">Signup</button>
          <button className="google-btn" type="button" onClick={() => alert("Google Signup not implemented")}> <span style={{ marginRight: 8 }}>G</span> Signup with Google </button>
        </form>
        <div className="login-link"> Already have an account? <span onClick={() => navigate("/login")}>Log in</span> </div>
      </div>
    </div>
  );
};

export default Signup;