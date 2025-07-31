import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  }
}, {
  timestamps: true
});

// Ensure a user can only register once for an event
registrationSchema.index({ user: 1, event: 1 }, { unique: true });

export default mongoose.model('Registration', registrationSchema); 