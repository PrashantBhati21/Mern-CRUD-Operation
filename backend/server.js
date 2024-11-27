const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbconnect = require("./config/db.js");

dotenv.config(); // Load environment variables from .env

const cors = require("cors");
app.use(cors());

const userDataRoute = require("./routes/userDataRoute.js");

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
dbconnect();
//Connected to routes
app.use(userDataRoute);
// Start the server
const PORT = process.env.PORT || 8000; // Use port from .env or fallback to 4000
app.listen(PORT, () => {
  console.log(`Server running succssfully on port ${PORT}`);
});
