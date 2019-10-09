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
class NotebookList extends React.Component {

  componentDidMount(){
    this.props.getNotebookList();
  }

  render() {
    const createNotebookListItem = (notebook) => {
      return (
        <li key={notebook.id}>
          {notebook.title}
        </li>
      )
    }

    return (
      <div>
        <h2>Notebooks</h2>
        <div className="container">
        {
            this.props.notebookList &&
            this.props.notebookList.length > 0 && 
            this.props.notebookList.map((item, index) => <div className="container"
              style={{padding: 10,backgroundColor: "antiquewhite", marginBottom : 10, borderRadius : 4}}
              onClick={(e) => {
                this.props.toggleNotes(item.id);
                this.props.getListOfNotes(item.id);
                console.log("EEEEEE", e);
              }}
              key={index}>
                <div className="container">
                  <div className="row">
                    <div className="col-sm-8">
                      { item.title }
                    </div>
                    <div className="col-sm-4">
                      <div className="row">
                        <div className="col-sm-4" onClick={e => {
                          
                        }}>
                          <u>Add Notes</u>
                        </div>
                        <div className="col-sm-4" onClick={e => {
                          
                        }}>
                          <u>Edit</u>
                        </div>
                        <div className="col-sm-4" onClick={e => {
                          this.props.deleteNoteBook(item);
                        }}>
                          <u>Delete</u>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-8">
                    {
                        item.showNotes && 
                          this.props.notesObj[item.id] &&
                            this.props.notesObj[item.id].map((note, index1) => (
                              <div className="container" onClick={(e) => {
                                this.props.toggleContent(item.id, note.id);
                                e.stopPropagation();
                              }}
                              key={index1} style={{padding: 10, backgroundColor: "lightblue", marginTop : 10, borderRadius : 4}}>
                                <div className="container">
                                  <div className="row">
                                    <div className="col-sm-8">
                                      { note.title }
                                    </div>
                                    <div className="col-sm-4">
                                      <div className="row">
                                        <div className="col-sm-6" onClick={e => {
                                          
                                        }}>
                                          <u>Edit</u>
                                        </div>
                                        <div className="col-sm-6" onClick={e => {
                                          e.stopPropagation();
                                          this.props.deleteNotes(note);
                                        }}>
                                          <u>Delete</u>
                                        </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                      {
                                        note.showContent && (
                                          <div style={{
                                            background: 'beige',
                                            padding: 10
                                          }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                          }}>
                                            { note.content }
                                          </div>
                                        )
                                      }
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
              </div>
            )
        }
        </div>
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
)(NotebookList);

module.exports = NotebookListContainer;
