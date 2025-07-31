import { Router } from "express";
import {
  registerForEvent,
  cancelRegistration
} from "../controllers/registration.controllers.js";
import { auth } from "../middleware/auth.middleware.js";

const registration = Router();

// Registration routes
registration.post("/registration/:eventId", auth, registerForEvent);
registration.delete("/registration/:eventId", auth, cancelRegistration);

export default registration; 