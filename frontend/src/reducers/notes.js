const _ = require('lodash');
const api = require('../helpers/api');
const notebooksReducer = require('./notebooks');

// Action type constants
/* *** TODO: Put action constants here *** */

const initialState = {
  notesObj : {}
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    /* *** TODO: Put per-action code here *** */
    case "UPDATE_NOTEBOOK_LIST":
      return Object.assign({}, state, { notebookList : action.notebookList });
    case "UPDATE_NOTES_LIST":
      let notesObj = state.notesObj;
      notesObj[action.notebookId] = action.notebookList;
      notesObj = _.cloneDeep(obj);
      return Object.assign({}, state, { notesObj : notesObj });
    default: return state;
  }
}

let updateNotesList = (notebookId, notesList) => {
  return {
    type : "UPDATE_NOTES_LIST",
    notebookId,
    notesList
  }
}

let getListOfNotes = (notebookId) => {
  return (dispatch) => {
    api.get('/notebooks/' + notebookId + '/notes').then(notesList => {
      dispatch(updateNotesList(notebookId, notesList));
    }).catch(err => {
      alert(JSON.stringify(err));
    });
  }
}

let createNotes = (note) => {
  return (dispatch) => {
      api.post('/notes', note).then(notebookList => {
        dispatch(notebooksReducer.getNotebookList(note.notebookId));
      }).catch(err => {
        alert(JSON.stringify(err));
      })
    }
};

let updateNotes = (note) => {
  return (dispatch) => {
      api.put('/'+ note.id , note).then(notebookList => {
        dispatch(notebooksReducer.getNotebookList(note.notebookId));
      }).catch(err => {
        alert(JSON.stringify(err));
      })
    }
};

let deleteNotes = (note) => {
  return (dispatch) => {
      api.delete('/'+ note.id).then(notebookList => {
        dispatch(notebooksReducer.getNotebookList(note.notebookId));
      }).catch(err => {
        alert(JSON.stringify(err));
      })
    }
};


// Export the action creators and reducer
module.exports = {
  notebooks : reducer,
  createNotes,
  updateNotes,
  deleteNotes,
  getListOfNotes
};
