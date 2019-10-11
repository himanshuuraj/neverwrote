const express = require('express');
const _ = require('lodash');
const models = require('../models');
const config = require('../../src/config/database');

const router = express.Router();

router.get('/', (req, res) => {
    let promise1 = models.Notebook.findAll();
    let promise2 = models.Note.findAll();
    Promise.all([promise1, promise2])
    .then(data => {
        let numberOfNotebooks = data[0].length;
        let numberOfNotes = data[1].length;
        let oldestNotebook = getOldestNotebook(data[0]);
        let recentlyUpdatedNote = getRecentlyUpdatedNote(data[1]);
        res.json({
           numberOfNotebooks, numberOfNotes, oldestNotebook, recentlyUpdatedNote
        });
      }).catch(err => res.status(500).json({ error: err.message }));  
  });

  let getOldestNotebook = arr => {
    if(arr.length == 0) return {};
    let oldestNotebook = arr[0];
    arr.forEach(element => {
      if(new Date(oldestNotebook.createdAt).getTime() > new Date(element.createdAt).getTime()){
        oldestNotebook = element;
      }
    });
    return oldestNotebook;
  }
  
  let getRecentlyUpdatedNote = arr => {
    if(arr.length == 0) return {};
    let updatedNote = arr[0];
    arr.forEach(element => {
      if(new Date(updatedNote.createdAt).getTime() < new Date(element.createdAt).getTime()){
        updatedNote = element;
      }
    });
    return updatedNote;
  }


module.exports = router;