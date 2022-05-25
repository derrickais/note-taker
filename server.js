const path = require("path");
const express = require("express");
const app = express();
const fs = require("fs");
const uniqid = require("uniqid");

const PORT = process.env.PORT || 3003;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/api/notes", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } 
        const content = JSON.parse(data);
        res.json(content);
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/notes", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } 
        const content = JSON.parse(data);
        const id = uniqid();
        const newNote = req.body;
        newNote.id = id;
        content.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(content), (err) => {
            if (err) {
                throw err;
            } 
            res.json(newNote);
        });
    });
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
})