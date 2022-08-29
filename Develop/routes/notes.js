const express = require('express');
const notes = express.Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notes.route('/')
  // GET Route for retrieving all the notes
  .get((req, res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
  })
  // POST Route for a new UX/UI note
  .post((req, res) => {
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      readAndAppend(newNote, './db/notes.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  })

module.exports = notes;
