import { Router } from "express";
import {
  createEvent,
  updateEvent,
  getEventById
} from "../controllers/event.controllers.js";
import { auth } from "../middleware/auth.middleware.js";

const event = Router();

// Event routes
event.post("/events", auth, createEvent);
event.put("/events/:id", auth, updateEvent);
event.get("/events/:id", auth, getEventById);

export default event; 