const express = require("express");
const http = require("http");
const path = require("path");
const app = express();

const port = process.env.PORT || 4050;

// Serve static files from the "build" directory
app.use(express.static(path.resolve(__dirname, "./frontend/build")));

// Handle requests for the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build", "index.html"));
});
app.get("/message", (req, res) => {
  res.send("hello from server");
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
