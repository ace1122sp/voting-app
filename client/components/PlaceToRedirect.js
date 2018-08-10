import React from 'react';
import { Redirect } from 'react-router-dom';

const switch1 = true;

const Oklahoma = props => {
 return  (
  <div>
    <h1>Another day in Oklahoma...</h1>
  </div>
 );
}


class PlaceToRedirect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shouldRun: false }
  }

  renderRedirect = () => {
    if (this.state.shouldRun) return <Redirect to='/no-pool' />
  }

  runAway = () => {
    this.setState({ shouldRun: true });
  }

  render () {
    return (
      <main>
        {this.renderRedirect()}
        {<Oklahoma />}
        <button onClick={this.runAway}>run away</button>
      </main>
    );
  }
}

export default PlaceToRedirect;