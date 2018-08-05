import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Main from '../components/Main';

const mapStateToProps = state => {
  let user;
  state.user ? user = true : user = false;

  return {
    user
  }
}

const Main_cont = withRouter(connect(mapStateToProps, null)(Main));

export default Main_cont;
