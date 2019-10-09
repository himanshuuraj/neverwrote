const _ = require('lodash');
const api = require('../helpers/api');
const notebooksReducer = require('./notebooks');

// Action type constants
/* *** TODO: Put action constants here *** */

const initialState = {
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
      let notebookList = state.notebookList;
      notebookList.map(item => {
        if(item.id == action.notebookId)
          item["notes"] = action.notesList;
      });
      notebookList = _.cloneDeep(notebookList);
      return Object.assign({}, state, { notebookList });

    default: return state;
  }
}

// let createNotes = (notebookId, notes) => {
//   return {
//     type : "CREATE_NOTES",
//     notebookId,
//     notes : notes
//   }
// }

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
  deleteNotes
};
