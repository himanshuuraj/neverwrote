const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */

const initialState = {
  notebookList : []
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
    case "TOGGLE_NOTES":
      let notebookList = state.notebookList;
      notebookList = notebookList.map(item => {
        if(item.id == action.notebookId)
          item['showNotes'] = !item["showNotes"];
        return item;
      });
      notebookList = _.cloneDeep(notebookList);
      return Object.assign({}, state, { notebookList });
    case "TOGGLE_ADD_NOTES":
      notebookList = state.notebookList;
      notebookList = notebookList.map(item => {
        if(item.id == action.notebookId)
          item['addNotes'] = !item["addNotes"];
        return item;
      });
      notebookList = _.cloneDeep(notebookList);
      return Object.assign({}, state, { notebookList });
    case 'TOGGLE_EDIT_NOTEBOOK':
      notebookList = state.notebookList;
      notebookList = notebookList.map(item => {
        if(item.id == action.notebookId)
          item['editNotebook'] = !item["editNotebook"];
        return item;
      });
      notebookList = _.cloneDeep(notebookList);
      return Object.assign({}, state, { notebookList });
    default: return state;
  }
}

let toggleShowNotes = notebookId => {
  return {
    type : "TOGGLE_ADD_NOTES",
    notebookId
  }
}

let updateNotebooks = notebookList => {
  return {
    type : "UPDATE_NOTEBOOK_LIST",
    notebookList
  }
}

let toggleNotes = notebookId => {
  return {
    type : "TOGGLE_NOTES",
    notebookId
  }
}

let toggleEditNotebook = notebookId => {
  return {
    type : 'TOGGLE_EDIT_NOTEBOOK',
    notebookId
  }
}

let getNotebookList = () => {
  return (dispatch) => {
      api.get('/notebooks').then(notebookList => {
        notebookList = notebookList.map(item => {
          item['showNotes'] = false;
          item['addNotes'] = false;
          item['editNotebook'] = false;
          return item;
        });
        dispatch(updateNotebooks(notebookList));
      }).catch(err => {
        alert(JSON.stringify(err));
      })
    }
};

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
      });
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
  createNoteBook,
  updateNoteBook,
  deleteNoteBook,
  toggleNotes,
  toggleShowNotes,
  toggleEditNotebook
};
