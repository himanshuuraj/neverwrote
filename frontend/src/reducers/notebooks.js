const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */

const initialState = {
  data: [
    { id: 100, title: 'From Redux Store: A hard-coded notebook' },
    { id: 101, title: 'From Redux Store: Another hard-coded notebook' },
  ]
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    /* *** TODO: Put per-action code here *** */

    default: return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */

// Export the action creators and reducer
module.exports = reducer;
