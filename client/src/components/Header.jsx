import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  console.log("Header - Auth State:", { user, isAuthenticated });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  };

  const isAdmin = user?.role === 'admin' || user?.email === 'crio.do.test@example.com';
  const isOrganizer = user?.role === 'organizer';

  return (
    <header className="signup-header">
      <nav>

      <span className="highlight" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        The Social Hub
      </span>
      
      
        {isAuthenticated ? (
          <>
            <button onClick={() => navigate("/dashboard")}>Dashboard</button>
            <button onClick={() => navigate("/profile")}>Profile</button>
            {isAdmin && (
              <>
                <button onClick={() => navigate("/admin")}>Admin</button>
                <button onClick={() => navigate("/organizer")}>Organizer</button>
              </>
            )}
            {isOrganizer && (
              <button onClick={() => navigate("/organizer")}>Organizer</button>
            )}
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/signup")}>Signup</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header; 