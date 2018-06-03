import { connect } from 'react-redux';
import Pool from '../components/Pool';

const mapStateToProps = state => {

  // according to :pool_id you need to provide pool's info
  // atm you don't need to send followers, just maybe its number,
  // just votes, but not info about voters
  return {}
}

const mapDispatchToProps = dispatch => {

  // need to provide vote(), follow(), addVotingOption()
  return {}
}

const Pool_cont = connect(mapStateToProps, mapDispatchToProps)(Pool);

export default Pool_cont;
