const express = require('express');
const _ = require('lodash');
const models = require('../models');
const config = require('../../src/config/database');

const router = express.Router();

/* *** TODO: Fill in the API endpoints for notes *** */


router.get('/', (req, res) => {
    models.Note.findAll({ order: [['createdAt', 'DESC']] })
      .then(notes => res.json(notes))
      .catch(err => res.status(500).json({ error: err.message }));
  });
  
  /* *** TODO: Fill in the API endpoints for notebooks *** */
  
  router.get('/:noteId', (req, res) => {
    let noteId = req.params.noteId;
    models.Note.find({
      where: {
         id: noteId
      }
    }).then(note => res.json(note))
    .catch(err => res.status(500).json({ error: err.message }));
  });
  
  router.post('/', (req, res) => {
    //let notebook = req.body.notebook;
    models.Note.create({
      title : req.body.title,
      content : req.body.content,
      notebookId : req.body.notebookId
    })
    .then(notebook => {
      res.json(notebook);
    }).catch(err => res.status(500).json({ error: err.message }));  
  });
  
  router.delete('/:noteId', (req, res) => {
    let noteId = req.params.noteId;
    models.Note.destroy({
      where: {
         id: noteId
      }
    }).then(note => res.json({}))
    .catch(err => res.status(500).json({ error: err.message })); 
  });
  
  router.put('/:noteId', (req, res) => {
    let noteId = req.params.noteId;
    models.Note.update({
        title: req.body.title,
        content : req.body.content,
        notebookId : req.body.notebookId
      },
      {
        where: {
          id: noteId
        }
      })
      .then(() => models.Note.find({
        where: {
          id: noteId
        }
      }))
      .then((note) => res.json(note))
      .catch(err => res.status(500).json({ error: err.message })); 
  });
  
  

module.exports = router;
