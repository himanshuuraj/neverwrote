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

  constructor(props){
    super(props);
    this.state = {
      title : '',
      content : ''
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.edit){
      this.setState({
        title : nextProps.notebook.title,
        content : notebook.note.content
      })
    }
  }

  render() {
    return (
      <div className="container">
        {
              this.props.addType == "notebook" && (
                <div className="row form-group">
                    <div className="col-sm-10">
                      <input type="text"
                        placeholder="Add title"
                        onChange={e=> {
                            this.setState({
                              title : e.target.value
                            });
                        }} value={this.state.title} className="form-control"/>
                    </div>
                    <div className="col-sm-2" style={{
                      display: "flex",
                      justifyContent: "center"
                    }}>
                      <button 
                        style={{
                          width : '100%'
                        }}
                        onClick={e => {
                          if(!this.state.title){
                            alert("Please add tile");
                            return;
                          }
                          this.props.onAdd({
                            title : this.state.title
                          });
                        }}
                        type="submit" 
                        className="btn btn-default">
                        ADD
                      </button>
                    </div>
                    {
                      this.props.edit && (
                        <div className="col-sm-2">
                          <button 
                            onClick={e => {
                              this.props.toggleEditNotebook( this.props.notebookId );
                            }}
                            type="submit" 
                            className="btn btn-default">
                            CANCEL
                          </button>
                        </div>
                      )
                    }
                </div>
              )
          }
          {
              this.props.addType == "notes" && (
                <div className="row form-group" style={{ marginBottom : 5, marginTop : 5 }}>
                    <div className="col-sm-5">
                      <input type="text"
                        placeholder="Add Title"
                        onChange={e=> {
                            //console.log(e.target.value);
                            this.setState({
                              title : e.target.value
                            });
                        }} className="form-control"/>
                    </div>
                    <div className="col-sm-5">
                      <input type="text"
                        placeholder="Add Content"
                        onChange={e=> {
                            //console.log(e.target.value);
                            this.setState({
                              content : e.target.value
                            });
                        }} className="form-control"/>
                    </div>
                    <div className="col-sm-2">
                      <button 
                        onClick={e => {
                          if(!this.state.title){
                            alert("Please add tile");
                            return;
                          }
                          if(!this.state.content){
                            alert("Please add content");
                            return;
                          }
                          this.props.onAdd({
                            title : this.state.title,
                            content : this.state.content,
                            notebookId : this.props.notebookId
                          });
                        }}
                        type="submit" 
                        className="btn btn-default">
                        ADD
                      </button>
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
