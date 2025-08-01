import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Events from "./components/Events";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import AdminOrganizerRequests from "./components/AdminOrganizerRequests";
import EventRegistrations from "./components/EventRegistrations";
import OrganizerDashboard from "./components/OrganizerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const location = useLocation();
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {location.pathname !== '/' && <Header />}
      <main style={{ width: '100%', height: location.pathname === '/' ? '100vh' : 'calc(100vh - 60px)', overflow: 'hidden' }}>
        <Routes>
            <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminOrganizerRequests /></ProtectedRoute>} />
          <Route path="/event-registrations" element={<ProtectedRoute><EventRegistrations /></ProtectedRoute>} />
          <Route path="/organizer" element={<ProtectedRoute><OrganizerDashboard /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
