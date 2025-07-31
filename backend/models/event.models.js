import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    enum: ['Online', 'Offline'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ""
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Event', eventSchema); 