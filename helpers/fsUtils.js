const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

const readAndDelete = (noteId, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let updatedData = deleteFromFile(noteId, parsedData);
      writeToFile(file, updatedData);
    }
  });
};

const deleteFromFile = (noteId, parsedData) => {
  let updatedData = parsedData.filter(element => element.note_id !== noteId);
  return updatedData;
};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };
