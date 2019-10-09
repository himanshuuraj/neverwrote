const React = require('react');
const ReactRedux = require('react-redux');
const Redux = require('redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');

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
        {
            this.props.notebookList &&
            this.props.notebookList.length > 0 && 
            this.props.notebookList.map((item, index) => <ul  
              onClick={() => {
                this.props.getListOfNotes(item.id);
              }}
              key={index}>
                <ul>
                { item.title }
                {
                  item.notes && item.notes.length > 0 && (
                  item.notes.map((note, index1) => <ol key={index1}>
                    {index1 + " " + note.title }
                    { note.content }
                  </ol>
                  ))
                }
                </ul>
              </ul>
            )
        }
      </div>
    );
  }
}

const NotebookListContainer = ReactRedux.connect(
  state => ({
    notebookList: state.notebooks.notebookList
  }),
  (dispatch) =>
    Redux.bindActionCreators(
      {
        getNotebookList : notebooksActionCreators.getNotebookList,
        getListOfNotes : notebooksActionCreators.getListOfNotes
      },
      dispatch
    )
)(NotebookList);

// const NotebookListContainer = ReactRedux.connect(
//   state => ({
//     notebooks: state.notebooks
//   }),
//   createActionDispatchers(notebooksActionCreators)
// )(NotebookList);

module.exports = NotebookListContainer;
