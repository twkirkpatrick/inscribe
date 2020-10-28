// Dependencies
var express = require("express");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "table.html"));
  });
  











// Starts the server to begin listening
// =============================================================
app.listen((PORT), function() {
    console.log(`app listening on http://localhost:${PORT}`);
  });