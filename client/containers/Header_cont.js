import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../components/Header';

import { fetchLogout } from '../actions/thunks/user';

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut_f: () => dispatch(fetchLogout())
  }
}

const Header_cont = withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

export default Header_cont;
