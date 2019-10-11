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
class NotebookList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      addNotebook : false,
      searchText : ""
    };
    this.onAddNotebook = this.onAddNotebook.bind(this);
    this.onAddNotes = this.onAddNotes.bind(this);
  }

  componentDidMount(){
    this.props.getNotebookList();
  }

  onAddNotebook(notebook){
    this.props.createNoteBook(notebook);
  }

  onAddNotes(notes){
    this.props.createNotes(notes);
  }

  render() {

    return (
      <div>
        <h2>Notebooks</h2>
            <button type="button" 
              className="btn btn-default" 
              style={{
                marginBottom: 10
              }} 
              onClick={e => {
                this.setState({
                  addNotebook : !this.state.addNotebook
                })
            }}>
              Add NoteBook
            </button>
        <div className="form-group" style={{
          marginBottom : 10
        }}>
          <input type="text" className="form-control"
          onChange = {e => {
            this.setState({
              searchText : e.target.value
            })
          }}
           placeholder="Search across all notebook and notes"/>
        </div>
        
        <div className="container" style={{ marginLeft : -15 }}>
          {
            this.state.addNotebook && (
              <AddEditNote addType = "notebook" onAdd={this.onAddNotebook}/>
            )
          }
        {
            this.props.notebookList &&
            this.props.notebookList.length > 0 && 
            this.props.notebookList
              .map((item, index) => <div className="container"
              style={{padding: 10,backgroundColor: "antiquewhite", marginBottom : 10, borderRadius : 4}}
              key={index}>
                {
                  item.editNotebook ? (
                    <div className="container">
                      <div className="row">
                        <AddEditNote notebook={item} edit onAdd={this.onAddNotes} addType={'notebook'} notebookId={item.id}/>
                      </div>
                    </div>
                  ) : (
                      <div className="row">
                        <div className="row" style={{paddingLeft : 30}}>
                          <div className="col-sm-8" 
                                onClick={(e) => {
                                  this.props.toggleNotes(item.id);
                                  this.props.getListOfNotes(item.id);
                                }}
                                style={{
                                  cursor : 'pointer'
                                }}>
                            <u>{ item.title }</u>
                          </div>
                          <div className="col-sm-4">
                            <div className="row">
                              <div className="col-sm-4" 
                                style={{
                                  cursor : 'pointer'
                                }}
                                onClick={e => {
                                  this.props.toggleShowNotes(item.id);
                                  e.stopPropagation();
                                }}>
                                <u>Add Notes</u>
                              </div>
                              <div className="col-sm-4"
                              style={{
                                cursor : 'pointer'
                              }}
                              onClick={e => {
                                this.props.toggleEditNotebook(item.id)
                              }}>
                                <u>Edit</u>
                              </div>
                              <div className="col-sm-4" 
                              style={{
                                cursor : 'pointer'
                              }}
                              onClick={e => {
                                this.props.deleteNoteBook(item);
                              }}>
                                <u>Delete</u>
                              </div>
                            </div>
                          </div>
                        </div>
                        {
                          item.addNotes && (
                            <div className="row">
                              <AddEditNote onAdd={this.onAddNotes} addType={'notes'} notebookId={item.id}/>
                            </div>
                          )
                        }
                        <div className="row" style={{ marginLeft : 25, marginRight : 25 }}>
                          {
                              item.showNotes && 
                                this.props.notesObj[item.id] &&
                                  this.props.notesObj[item.id]
                                    .filter(item => {
                                      if(item.title.includes(this.state.searchText)) return true;
                                      if(item.content.includes(this.state.searchText)) return true;
                                      return false;
                                    })
                                    .map((note, index1) => (
                                    <div className="container-fluid" onClick={(e) => {
                                      this.props.toggleContent(item.id, note.id);
                                      e.stopPropagation();
                                    }}
                                    key={index1} style={{padding: 10, border: "1px solid blue", marginTop : 10, borderRadius : 4}}>
                                      <div className="container-fluid">
                                        <div className="row">
                                          <div className="col-sm-8">
                                            <u>{ note.title }</u>
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
                                        </div>
                                        <div className="row" style={{
                                          backgroundColor: '#bbb',
                                          borderRadius: 4,
                                          marginTop: 8,
                                          paddingLeft: 4
                                        }}>
                                            {
                                              note.showContent && (
                                                <div style={{
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
                                  )
                                )
                            }
                          </div>
                      </div>
                    )
                }
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
        deleteNotes : notesActionCreators.deleteNotes,
        createNoteBook : notebooksActionCreators.createNoteBook,
        toggleShowNotes : notebooksActionCreators.toggleShowNotes,
        createNotes : notesActionCreators.createNotes,
        toggleEditNotebook : notebooksActionCreators.toggleEditNotebook
      },
      dispatch
    )
)(NotebookList);

module.exports = NotebookListContainer;
