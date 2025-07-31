import Event from "../models/event.models.js";

// Create event
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
      eventType,
      category,
      image
    } = req.body;

    const organizerId = req.user.id;

    const event = new Event({
      title,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
      eventType,
      category,
      image: image || "",
      organizer: organizerId
    });

    await event.save();

    res.status(201).json({
      _id: event._id.toString(),
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      startTime: event.startTime,
      endDate: event.endDate,
      endTime: event.endTime,
      location: event.location,
      eventType: event.eventType,
      category: event.category,
      image: event.image,
      organizer: event.organizer.toString()
    });
  } catch (error) {
    console.error("Create event error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const userId = req.user.id;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user is the organizer or admin
    if (event.organizer.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Not authorized to update this event" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      message: "Event updated",
      event: updatedEvent
    });
  } catch (error) {
    console.error("Update event error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get event by ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id).populate('organizer', 'name email');
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Get event error:", error);
    res.status(500).json({ message: "Server error" });
  }
}; 