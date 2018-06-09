import { connect } from 'react-redux';
import Header from '../components/Header';
import { signOut } from '../actions/user';

const mapStateToProps = state => {
  return {
    activeUser: state.activeUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut_f: () => dispatch(signOut())
  }
}

const Header_cont = connect(mapStateToProps, mapDispatchToProps)(Header);

export default Header_cont;
