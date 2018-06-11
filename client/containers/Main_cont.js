import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Main from '../components/Main';

const mapStateToProps = state => {
  return {
    userSignedIn: state.userSignedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const Main_cont = withRouter(connect(mapStateToProps, null)(Main));

export default Main_cont;
