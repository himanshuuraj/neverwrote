/**
 * Specify all of your reducers in this file, so they can be combined into
 * one big reducer.
 */

const Redux = require('redux');

module.exports = Redux.combineReducers({
  notebooks: require('./notebooks').notebooks,
  notes : require("./notes").notes,
  statistics : require("./statistics").statistics
  /* *** TODO: Put any other reducers in here *** */
  // eg. `notes: require('./notes')` if you have a reducer in reducers/notes.js
});
