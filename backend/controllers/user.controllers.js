import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

// Register user
export const register = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      avatar: avatar || ""
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "24h" }
    );

    res.status(200).json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Request organizer role
export const requestOrganizer = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== 'user') {
      return res.status(400).json({ message: "User is already an organizer or admin" });
    }

    user.organizerRequest = true;
    user.organizerRequestStatus = 'pending';
    await user.save();

    res.status(200).json({ message: "Organizer request submitted successfully" });
  } catch (error) {
    console.error("Request organizer error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, avatar } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.status(200).json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get organizer requests (admin only)
export const getOrganizerRequests = async (req, res) => {
  try {
    const requests = await User.find({
      organizerRequest: true,
      organizerRequestStatus: 'pending'
    }).select('-password');

    res.status(200).json(requests);
  } catch (error) {
    console.error("Get organizer requests error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Approve/reject organizer request (admin only)
export const approveOrganizer = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.organizerRequest) {
      return res.status(400).json({ message: "User has not requested organizer role" });
    }

    user.role = 'organizer';
    user.organizerRequestStatus = 'approved';
    await user.save();

    res.status(200).json({ message: "User approved as Organizer" });
  } catch (error) {
    console.error("Approve organizer error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
