const React = require('react');
const ReactRedux = require('react-redux');
const Redux = require('redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const notesActionCreators = require('../reducers/notes');
import AddEditNote from "./AddEditNote";
import SearchList from "./SearchList";

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class EditComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            title : nextProps.updateObj.title,
            content : nextProps.updateObj.content,
            type : nextProps.updateObj.type
        });
    }

    render(){
        if(!this.props.showEditPopUp)
            return null;
        return (<div style={{
                position: 'fixed', left : 0, top: 0, width : '100%', 
                height : '100%', backgroundColor : 'rgb(0,0,0,0.8)',
                display : 'flex',
                justifyContent : 'center',
                alignItems : 'center'
            }}>
            <div style={{ padding : 30, position: 'relative', backgroundColor: 'white'}}>
                <div style={{ position : 'absolute', right : 10, top : 10 }}
                    onClick={e => {
                        this.props.toggleEditComponent(false);
                    }}>
                    CLOSE
                </div>
                <div>
                    EDIT {this.state.type && this.state.type.toUpperCase()}
                </div>
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">title</label>
                        <input type="text"
                         value={this.state.title}
                         onChange = {e => {
                             this.setState({
                                 title : e.target.value
                             });
                         }}
                         className="form-control" placeholder="Title"/>
                    </div>
                    {
                        this.state.type != 'notebook' && (
                            <div className="form-group">
                                <label for="exampleInputPassword1">Content</label>
                                <input type="text"
                                onChange = {e => {
                                    this.setState({
                                        content : e.target.value
                                    });
                                }}
                                value={this.state.content}
                                className="form-control" placeholder="Content"/>
                            </div>
                        )
                    }
                    <button 
                    onClick={e => {
                        if(!this.state.title){
                            alert("Please insert title");
                            return;
                        }
                        if(this.state.type == 'notebook'){                           
                            this.props.updateNoteBook({
                                id : this.props.updateObj.id,
                                content : this.state.content,
                                title : this.state.title
                            });
                        }else{
                            this.props.updateNotes({
                                id : this.props.updateObj.id,
                                content : this.state.content,
                                title : this.state.title
                            });
                        }
                    }}
                    type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
        );
    }
}

const EditComponentContainer = ReactRedux.connect(
    state => ({
        updateObj : state.notebooks.updateObj || {},
        showEditPopUp : state.notebooks.showEditPopUp
    }),
    (dispatch) =>
      Redux.bindActionCreators(
        {
            updateNoteBook : notebooksActionCreators.updateNoteBook,
            updateNotes : notesActionCreators.updateNotes,
            toggleEditComponent : notebooksActionCreators.toggleEditComponent
        },
        dispatch
      )
  )(EditComponent);
  
  module.exports = EditComponentContainer;
