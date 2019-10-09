const React = require('react');
const ReactRedux = require('react-redux');
const Redux = require('redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const notesActionCreators = require('../reducers/notes');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class AddEditNote extends React.Component {

  componentDidMount(){
    this.props.getNotebookList();
  }

  render() {

    return (
      <div className="container">
          {
              this.props.addType == "notes" && (
                <div className="row">
                    <div className="col-sm-5">
                        <textinput onChange={e=> {
                            console.log(e);
                        }}/>
                    </div>
                    <div className="col-sm-5">
                        <textinput onChange={e=> {
                            console.log(e);
                        }}/>
                    </div>
                    <div className="col-sm-2">
                        <u>Add</u>
                    </div>
                </div>
              )
          }
      </div>
    );
  }
}

const NotebookListContainer = ReactRedux.connect(
  state => ({
    notebookList: state.notebooks.notebookList,
    notesObj: state.notes.notesObj
  }),
  (dispatch) =>
    Redux.bindActionCreators(
      {
        getNotebookList : notebooksActionCreators.getNotebookList,
        getListOfNotes : notesActionCreators.getListOfNotes,
        toggleNotes : notebooksActionCreators.toggleNotes,
        toggleContent : notesActionCreators.toggleContent,
        deleteNoteBook : notebooksActionCreators.deleteNoteBook,
        deleteNotes : notesActionCreators.deleteNotes
      },
      dispatch
    )
)(AddEditNote);

module.exports = NotebookListContainer;
