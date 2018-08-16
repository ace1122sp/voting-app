import React from 'react';
import { URL_PROFILE } from '../../resources/urls';

class DeleteProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ''
    };
  }

  handlePasswordTyping = e => {
    this.setState({ password: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    // this.props.deleteProfile_f();
    console.log(this.state.password);
  }

  showForm = () => 
    <form action={URL_PROFILE} method="DELETE" onSubmit={this.handleSubmit}>
      <label htmlFor="password">password</label>
      <input type="password" name="password" id="password" onChange={this.handlePasswordTyping} value={this.state.password} />
      <input type="submit" name="submit" value="Delete" />
    </form>

  showMessage = () => 
    <div>
      {this.props.updateStatus}
    </div>

  render () {
    return (
      <div>
        { !this.props.updateStatus && this.showForm() || this.showMessage() }
      </div>
    );
  }
}

export default DeleteProfile;