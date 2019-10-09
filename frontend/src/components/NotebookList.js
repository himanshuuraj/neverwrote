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
        <div>
        {
            this.props.notebookList &&
            this.props.notebookList.length > 0 && 
            this.props.notebookList.map((item, index) => <div
              style={{padding: 10,backgroundColor: "antiquewhite", marginBottom : 10, borderRadius : 4}}
              onClick={(e) => {
                this.props.toggleNotes(item.id);
                this.props.getListOfNotes(item.id);
                console.log("EEEEEE", e);
              }}
              key={index}>
                { item.title }
                {
                  item.showNotes && 
                    this.props.notesObj[item.id] &&
                      this.props.notesObj[item.id].map((note, index1) => (
                        <div onClick={(e) => {
                          e.stopPropagation();
                        }}
                         key={index1} style={{padding: 10, backgroundColor: "lightblue", marginTop : 10, borderRadius : 4}}>
                          { note.title }
                        </div>
                      )
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
        toggleNotes : notebooksActionCreators.toggleNotes
      },
      dispatch
    )
)(NotebookList);

module.exports = NotebookListContainer;
