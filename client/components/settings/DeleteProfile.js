import React from 'react';

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

  handleSubmit = () => {
    this.props.deleteProfile_f();
  }

  showPrompt = () => 
    <div>
      <span>Are you sure you want to delete your profile?</span>
      <button onClick={this.handleSubmit}>Confirm</button>
    </div>
      

  showMessage = () => 
    <div>
      {this.props.updateStatus}
      <button onClick={this.props.renderRedirect_f}>Ok</button>
    </div>

  render () {
    if (this.props.fetching) return <span>Loading...</span>;

    return (
      <div>
        { !this.props.updateStatus && this.showPrompt() || this.showMessage() }
      </div>
    );
  }
}

export default DeleteProfile;