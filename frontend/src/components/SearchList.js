const React = require('react');
const ReactRedux = require('react-redux');
const Redux = require('redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const notesActionCreators = require('../reducers/notes');
import AddEditNote from "./AddEditNote";

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class SearchList extends React.Component {

  render() {
    return (
        <div className="container" style={{ marginLeft : -15 }}>
        {
            this.props.searchData &&
            this.props.searchData.notebooks &&
            this.props.searchData.notebooks.length > 0 && 
            this.props.searchData.notebooks
              .map((item, index) => <div className="container"
              style={{padding: 10,backgroundColor: "antiquewhite", marginBottom : 10, borderRadius : 4}}
              key={index}> 
                <div className="row">
                        <div className="row" style={{paddingLeft : 30}}>
                            <u>{ item.title }</u>
                        </div>
                        <div className="row" style={{ marginLeft : 25, marginRight : 25 }}>
                          {
                                this.props.searchData.notes &&
                                this.props.searchData.notes.length > 0 &&
                                this.props.searchData.notes
                                    .filter(item1 => item1.notebookId == item.id)
                                    .map((note, index1) => (
                                    <div className="container-fluid"
                                    key={index1} style={{padding: 10, border: "1px solid blue", marginTop : 10, borderRadius : 4}}>
                                      <div className="container-fluid">
                                        <div className="row">
                                            <u>{ note.title }</u>
                                        </div>
                                        <div className="row" style={{
                                          backgroundColor: '#bbb',
                                          borderRadius: 4,
                                          marginTop: 8,
                                          paddingLeft: 4
                                        }}>
                                            <div style={{
                                                padding: 10
                                            }}>
                                                { note.content }
                                            </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                            }
                          </div>
                      </div>
              </div>
            )
        }
        </div>
    );
  }
}

const SearchListContainer = ReactRedux.connect(
  state => ({
    notebookList: state.notebooks.notebookList,
    notesObj: state.notes.notesObj,
    searchData : state.notebooks.searchData
  }),
  (dispatch) =>
    Redux.bindActionCreators(
      {
        getNotebookList : notebooksActionCreators.getNotebookList,
        getListOfNotes : notesActionCreators.getListOfNotes,
        toggleNotes : notebooksActionCreators.toggleNotes,
        toggleContent : notesActionCreators.toggleContent,
        deleteNoteBook : notebooksActionCreators.deleteNoteBook,
        deleteNotes : notesActionCreators.deleteNotes,
        createNoteBook : notebooksActionCreators.createNoteBook,
        toggleShowNotes : notebooksActionCreators.toggleShowNotes,
        createNotes : notesActionCreators.createNotes,
        toggleEditNotebook : notebooksActionCreators.toggleEditNotebook
      },
      dispatch
    )
)(SearchList);

module.exports = SearchListContainer;
