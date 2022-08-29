const express = require('express');
const notes = express.Router();
const { readFromFile, readAndAppend, readAndDelete, } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require('fs');
const { parse } = require('path');
// const test = require('../db/notes.json')

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

  notes.route('/:id')
    .delete((req, res) => {
      console.log('hello', req.params.id);
      res.send("Delete request");

      // const noteId = req.params.id;
      // readAndDelete(noteId, './db/notes.json')

      fs.readFile('./db/notes.json', 'utf8', (err, data) => {
        if (err) {
          console.error('5 = ', err);
        } else {
          console.log('6 = ', JSON.parse(data));
          const parsedData = JSON.parse(data);
          console.log(parsedData.length)
          
          for (let i = 0; i < parsedData.length; i++) {
            if(parsedData[i].note_id === req.params.id) {
              console.log('MATCH =', i);
              parsedData.splice(i, 1);
            } else {
              console.log('NO MATCH ', i);
            }
          }

          console.log('a = ', parsedData);
          console.log('b = ', JSON.stringify(parsedData), '----------')

          fs.writeFile('./db/notes.json', JSON.stringify(parsedData, null, 4), (err) =>
          err ? console.error('error = ', err) : console.log(`\nData written to`)
          );
        }
      });

    })

module.exports = notes;
