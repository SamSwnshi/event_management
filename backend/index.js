import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import config from "./db/config.js";
import userRoutes from './routes/user.routes.js'
import eventRoutes from './routes/event.routes.js'
import registrationRoutes from './routes/registration.routes.js'
import bcrypt from "bcrypt";
import User from "./models/user.models.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Add a simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});


app.use('/api', userRoutes)
app.use('/api', eventRoutes)
app.use('/api', registrationRoutes)

app.listen(port, () => {
  console.log(`Server is connected to PORT: ${port} ��`);
  config()
});
