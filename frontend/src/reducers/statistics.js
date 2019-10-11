const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */

const initialState = {
  numberOfNotebooks : 0,
  numberOfNotes : 0,
  oldestNotebook : {},
  recentlyUpdatedNote : {}
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    /* *** TODO: Put per-action code here *** */
    case "UPDATE_STATS":
      return Object.assign({}, state, { 
        numberOfNotebooks : action.numberOfNotebooks,
        numberOfNotes : action.numberOfNotes,
        oldestNotebook : action.oldestNotebook,
        recentlyUpdatedNote : action.recentlyUpdatedNote
      })
    default: return state;
  }
}

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

const getStatistics = () => {
  return (dispatch) => {
    let getNumberOfNotebooks = api.get('/notebooks');
    let getNumberOfNotes = api.get('/notes');
    Promise.all([getNumberOfNotebooks, getNumberOfNotes]).then(data => {
      let numberOfNotebooks = data[0].length;
      let numberOfNotes = data[1].length;
      let oldestNotebook = getOldestNotebook(data[0]);
      let recentlyUpdatedNote = getRecentlyUpdatedNote(data[1]);
      dispatch({ type : "UPDATE_STATS", numberOfNotebooks, numberOfNotes, oldestNotebook, recentlyUpdatedNote });
    }).catch(err => {
      console.log(err);
    })
  }
}

let deleteNoteBook = (notebook) => {
  return (dispatch) => {
      api.delete('/notebooks/'+ notebook.id).then(notebook => {
        dispatch(getNotebookList());
      }).catch(err => {
        alert(JSON.stringify(err));
      })
    }
};

// Export the action creators and reducer
module.exports = {
  statistics : reducer,
  getStatistics
};
