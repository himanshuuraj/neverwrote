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
      notesObj[action.notebookId] = action.notesList;
      notesObj = _.cloneDeep(notesObj);
      return Object.assign({}, state, { notesObj : notesObj });
    case "TOGGLE_CONTENT":
      notesObj = state.notesObj;
      let notesList = notesObj[action.notebookId];
      notesList = notesList.map(item => {
        if(item.id == action.noteId)
          item['showContent'] = !item["showContent"];
        return item;
      });
      notesObj = _.cloneDeep(notesObj);
      return Object.assign({}, state, { notesObj });
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
      notesList = notesList.map(item => {
        item['showContent'] = false;
        return item;
      });
      dispatch(updateNotesList(notebookId, notesList));
    }).catch(err => {
      alert(JSON.stringify(err));
    });
  }
}

let toggleContent = (notebookId, noteId) => {
  return {
    type : "TOGGLE_CONTENT",
    notebookId,
    noteId
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
      api.delete('/notes/'+ note.id).then(notebookList => {
        dispatch(notebooksReducer.getNotebookList(note.notebookId));
      }).catch(err => {
        alert(JSON.stringify(err));
      })
    }
};


// Export the action creators and reducer
module.exports = {
  notes : reducer,
  createNotes,
  updateNotes,
  deleteNotes,
  getListOfNotes,
  toggleContent
};
