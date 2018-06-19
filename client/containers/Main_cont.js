import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Main from '../components/Main';

const mapStateToProps = state => {
  let userSignedIn;
  state.activeUser ? userSignedIn = true : userSignedIn = false;

  return {
    userSignedIn
  }
}

const Main_cont = withRouter(connect(mapStateToProps, null)(Main));

export default Main_cont;
