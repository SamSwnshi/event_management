import Registration from "../models/registration.models.js";
import Event from "../models/event.models.js";

// Register for an event
export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user is already registered
    const existingRegistration = await Registration.findOne({
      user: userId,
      event: eventId
    });

    if (existingRegistration) {
      return res.status(400).json({ message: "Already registered for this event" });
    }

    // Create registration
    const registration = new Registration({
      user: userId,
      event: eventId
    });

    await registration.save();

    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error("Register for event error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Already registered for this event" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// Cancel registration
export const cancelRegistration = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    // Check if registration exists
    const registration = await Registration.findOne({
      user: userId,
      event: eventId
    });

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    await Registration.findByIdAndDelete(registration._id);

    res.status(200).json({ message: "Registration cancelled" });
  } catch (error) {
    console.error("Cancel registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
}; 