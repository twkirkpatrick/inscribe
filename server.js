// Dependencies
const http = require("http");
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8050;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'Develop/public')));

// Main Routes
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

//post request grabs the information the user inputs and creates a new note object
//Unique id is added to object using the uuid package which generates a random ID
//newNote object is pushed into original array, and is written to the db.json file
app.post("/api/notes",(req, res) => {
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuid.v4()
    }
  
    fs.readFile("Develop/db/db.json", (err, data) => {
      const json = JSON.parse(data);
      json.push(newNote);
      fs.writeFile("Develop/db/db.json", JSON.stringify(json), err => {
        if(err) throw err;
        res.send("Note saved!");
      })
    })
    
})

//Delete request takes in note id as a parameter
//Filter method used to create a new array of objects containing notes that DO NOT have the matching id
//Write new array to db.json file
   app.delete("/api/notes/:id", (req, res) => {
    
    const uniqueId = req.params.id;

    fs.readFile("Develop/db/db.json", (err, data) => {

      const parsed = JSON.parse(data)
      const remove = parsed.filter(note => note.id !== uniqueId)
      fs.writeFile("Develop/db/db.json", JSON.stringify(remove), err => {
        if(err) throw err;
        res.send("Note deleted!");
      })

    })
   
  }); 
 

// Starts the server to begin listening
// =============================================================
app.listen((PORT), function() {
    console.log(`app listening on http://localhost:${PORT}`);
  });