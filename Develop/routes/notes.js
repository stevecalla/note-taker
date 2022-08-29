const express = require('express');
const notes = express.Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require('fs');
const { parse } = require('path');

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

      fs.readFile('./db/notes.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log(JSON.parse(data));
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

          console.log(parsedData);
          console.log(JSON.stringify(parsedData))

          fs.writeFile('./db/notes.json', JSON.stringify(parsedData, null, 4), (err) =>
          err ? console.error(err) : console.info(`\nData written to ${destination}`)
          );
        }
 
      });
    })

module.exports = notes;
