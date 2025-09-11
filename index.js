import express from "express";
import cors from "cors";
import connectDB from "./db/database.js";
import userRoutes from "./routes/routes.js";
import cookieParser from "cookie-parser";

import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Routes setup
app.use("/api/user", userRoutes);


// dummy route to check if the server is running
app.get("/", (req, res) => {
  res.send("Hi, Welcome to the server!");
});



// Connect to the database and start the server
connectDB()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is up and running on port http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error("Failed to connect to the database:", error);
  process.exit(1);
})