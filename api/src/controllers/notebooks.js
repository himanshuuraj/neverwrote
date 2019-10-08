const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

// Index
router.get('/', (req, res) => {
  models.Notebook.findAll({ order: [['createdAt', 'DESC']] })
    .then(notebooks => res.json(notebooks))
    .catch(err => res.status(500).json({ error: err.message }));
});

/* *** TODO: Fill in the API endpoints for notebooks *** */

router.get('/:notebookId/notes', (req, res) => {
  let notebookId = req.params.notebookId;
  models.Note.find({
    where: {
       notebookId : notebookId
    }
  }).then(notes => {
    if(notes == null) notes = [];
    return res.json(notes);
  })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/:notebookId', (req, res) => {
  let notebookId = req.params.notebookId;
  models.Notebook.find({
    where: {
       id: notebookId
    }
  }).then(notebook => res.json(notebook))
  .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/', (req, res) => {
  //let notebook = req.body.notebook;
  models.Notebook.create({
    title : req.body.title
  })
  .then(notebook => {
    res.json(notebook);
  }).catch(err => res.status(500).json({ error: err.message }));  
});

router.delete('/:notebookId', (req, res) => {
  let notebookId = req.params.notebookId;
  models.Notebook.destroy({
    where: {
       id: notebookId
    }
  }).then(notebook => res.json({}))
  .catch(err => res.status(500).json({ error: err.message })); 
});

router.put('/:notebookId', (req, res) => {
  let notebookId = req.params.notebookId;
  models.Notebook.update({
      title: req.body.title
    },
    {
      where: {
        id: notebookId
      },
      plain: true
    })
    .then(() => models.Notebook.find({
          where: {
            id: notebookId
          }
        }))
    .then((notebook) => res.json(notebook))
    .catch(err => res.status(500).json({ error: err.message })); 
});



module.exports = router;
