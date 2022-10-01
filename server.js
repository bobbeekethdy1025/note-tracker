//code created with help of peers. also had starter code that was provided to students
const express = require('express');
const path = require('path');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const noteData = require('./db/db.json')
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) throw err;
        var notes = JSON.parse(data);
        res.json(notes);
    });
});

app.post('/api/notes', (req, res) => {
    let notes = req.body;
    notes.id = uuidv4();
    noteData.push(notes);
    fs.writeFile('./db/db.json', JSON.stringify(noteData, null, 2), (err) => {
        if(err) throw err;
        res.json(notes);
    });
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
