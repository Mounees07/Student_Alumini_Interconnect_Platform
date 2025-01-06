const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const studentRoutes = require("./routes/student.routes.js");
const studentauthRoutes = require("./routes/student_auth.routes.js");
const studentJobRoutes = require("./routes/studentJobRoutes.js");
const galleryRoutes = require("./routes/galleryRoutes.js");
const eventRoutes = require("./routes/eventRoutes.js");
const contactRoutes = require("./routes/contactRoutes.js");
const officeBearerRoutes = require("./routes/officeBearer.js");

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());

// CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:5173"], // Corrected origin
    methods: ["GET", "POST", "PUT", "HEAD", "DELETE", "PATCH"], // Corrected methods
    credentials: true,
  })
);

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, '../frontend/public/uploads')));

// Database connection
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Mongodb is connected");
  })
  .catch((err) => {
    console.error(err);
  });

// Routes
app.use("/server/student", studentRoutes);
app.use("/server/studentauth", studentauthRoutes);
app.use("/server/job", studentJobRoutes);
app.use("/server/post", galleryRoutes);
app.use("/server/event", eventRoutes);
app.use("/server/contact", contactRoutes);
app.use("/server/officebearer", officeBearerRoutes);

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
