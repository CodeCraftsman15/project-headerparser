// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static("public"));

// Root route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Example test endpoint (not required by the project, but typically included)
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

/**
 * Request Header Parser Microservice
 * Route: /api/whoami
 */
app.get("/api/whoami", (req, res) => {
  // 1) Get IP Address
  // If behind a proxy (e.g., on Replit or Glitch), 'x-forwarded-for' might contain a list of IPs.
  // The first IP in the list is typically the client's real IP.
  const ip = req.headers["x-forwarded-for"]
    ? req.headers["x-forwarded-for"].split(",")[0]
    : req.ip;

  // 2) Get Preferred Language
  const language = req.headers["accept-language"];

  // 3) Get User-Agent (software)
  const software = req.headers["user-agent"];

  res.json({
    ipaddress: ip,
    language: language,
    software: software
  });
});

// Start the server
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
