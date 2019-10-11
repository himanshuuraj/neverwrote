const React = require('react');
const ReactRedux = require('react-redux');
const Redux = require('redux');

const statisticsActionCreators = require('../reducers/statistics');
/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class Statistics extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
        this.props.getStatistics();
  }

  render() {
    return (
      <div>
          <button type="button" className="btn btn-primary"
            onClick={e => {
                this.props.getStatistics();
            }}>
              Refresh
          </button>
          <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    Note Count
                </div>
                <div className="col-sm-6">
                    { this.props.numberOfNotes }
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    Notebook Count
                </div>
                <div className="col-sm-6">
                { this.props.numberOfNotebooks }
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    Oldest Notebook
                </div>
                <div className="col-sm-6">
                { this.props.oldestNotebook.title }
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    Recently Updated Note
                </div>
                <div className="col-sm-6">
                { this.props.recentlyUpdatedNote.title }
                </div>
            </div>
          </div>
      </div>
    );
  }
}

const StatisticsContainer = ReactRedux.connect(
  state => ({
    numberOfNotebooks: state.statistics.numberOfNotebooks,
    numberOfNotes: state.statistics.numberOfNotes,
    oldestNotebook: state.statistics.oldestNotebook,
    recentlyUpdatedNote: state.statistics.recentlyUpdatedNote,
  }),
  (dispatch) =>
    Redux.bindActionCreators(
      {
          getStatistics : statisticsActionCreators.getStatistics
      },
      dispatch
    )
)(Statistics);

module.exports = StatisticsContainer;
