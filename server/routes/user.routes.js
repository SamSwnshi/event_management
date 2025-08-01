import { Router } from "express";
import {
  register,
  login,
  requestOrganizer,
  updateProfile,
  getOrganizerRequests,
  approveOrganizer
} from "../controllers/user.controllers.js";
import { auth, isAdmin } from "../middleware/auth.middleware.js";

const user = Router();

// Auth routes
user.post("/auth/register", register);
user.post("/auth/login", login);

// User routes (protected)
user.put("/users/request-organizer", auth, requestOrganizer);
user.put("/users/profile", auth, updateProfile);

// Admin routes (protected)
user.get("/admin/organizer-requests", auth, isAdmin, getOrganizerRequests);
user.put("/admin/users/:id/approve-organizer", auth, isAdmin, approveOrganizer);

export default user;