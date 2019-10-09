const _ = require('lodash');
const api = require('../helpers/api');

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

let updateNotebooks = notebookList => {
  return {
    type : "UPDATE_NOTEBOOK_LIST",
    notebookList
  }
}

let updateNotesList = (notebookId, notesList) => {
  return {
    type : "UPDATE_NOTES_LIST",
    notebookId,
    notesList
  }
}

let getNotebookList = () => {
  return (dispatch) => {
      api.get('/notebooks').then(notebookList => {
        dispatch(updateNotebooks(notebookList));
      }).catch(err => {
        alert(JSON.stringify(err));
      })
    }
};

let getListOfNotes = (notebookId) => {
  return (dispatch) => {
    api.get('/notebooks/' + notebookId + '/notes').then(notesList => {
      dispatch(updateNotesList(notebookId, notesList));
    }).catch(err => {
      alert(JSON.stringify(err));
    });
  }
}

let createNoteBook = (notebook) => {
  return (dispatch) => {
      api.post('/notebooks', notebook).then(notebook => {
        dispatch(getNotebookList());
      }).catch(err => {
        alert(JSON.stringify(err));
      })
    }
};

let updateNoteBook = (notebook) => {
  return (dispatch) => {
      api.put('/notebooks/'+ notebook.id).then(notebook => {
        dispatch(getNotebookList());
      }).catch(err => {
        alert(JSON.stringify(err));
      })
    }
};

let deleteNoteBook = (notebook) => {
  return (dispatch) => {
      api.delete('/notebooks/'+ notebook.id).then(notebook => {
        dispatch(getNotebookList());
      }).catch(err => {
        alert(JSON.stringify(err));
      })
    }
};

// Action creators
/* *** TODO: Put action creators here *** */

// Export the action creators and reducer
module.exports = {
  notebooks : reducer,
  getNotebookList,
  getListOfNotes,
  createNoteBook,
  updateNoteBook,
  deleteNoteBook
};
