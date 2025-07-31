import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
