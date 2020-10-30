// Dependencies
const http = require("http");
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

// Sets up the Express App
var app = express();
var PORT = 8050;

 

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'Develop/public')));




// Routes
// =============================================================

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});



//API Routes
//==============================================================

app.get("/api/notes", function(req, res) {
  fs.readFile("Develop/db/db.json", (err, data) => {
    if (err){
      
      throw err;
    }
    
    res.json(JSON.parse(data));
  })
});


app.post("/api/notes", function(req, res) {
    var newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuid.v4()
    }
    console.log(newNote);
  
    fs.readFile("Develop/db/db.json", (err, data) => {
      var json = JSON.parse(data);
      json.push(newNote);
      fs.writeFile("Develop/db/db.json", JSON.stringify(json), err => {
        if(err) throw err;
        res.json("completed");
      })
    })
    
})

 

   app.delete("/api/notes/:id", function(req, res){

    var uniqueId = req.params.id;

    fs.readFile("Develop/db/db.json", (err, data) => {

      var parsed = JSON.parse(data)
      var remove = parsed.filter(note => note.id !== uniqueId)
      fs.writeFile("Develop/db/db.json", JSON.stringify(remove), err => {
        if(err) throw err;
        res.send("Successfully deleted!");
      })


      
    })
    // should receive a query parameter containing the id of a note to delete.
    // Find a way to give each note a unique ID when saved
    // In order to delete a note, you'll need to read all notes from db.json
    // Remove note with the given id property
    // rewrite the notes to the db.json file
  }); 
 

  











// Starts the server to begin listening
// =============================================================
app.listen((PORT), function() {
    console.log(`app listening on http://localhost:${PORT}`);
  });