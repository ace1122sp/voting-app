import React from 'react';

import '../../style/Portal.css';

import InlineLoading from '../InlineLoading.js';

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
    const cancelBtn = document.getElementById('delete-cancel-btn');
    cancelBtn.setAttribute('disabled', '');
    cancelBtn.className += ' invisible';
    this.props.deleteProfile_f();
  }

  showPrompt = () => 
    <div className='portal-inner-wrap'>
      <p>Are you sure you want to delete your profile?</p>
      <button className='danger-btn' onClick={this.handleSubmit}>Confirm</button>
    </div>
      

  showMessage = () => 
    <div className='portal-inner-wrap'>
      <p>{this.props.updateStatus}</p>
      <button className='button-base neutral-btn' onClick={this.props.renderRedirect_f}>Ok</button>
    </div>

  render () {
    if (this.props.fetching) return <InlineLoading />;
    
    return (
      <div className='portal-inner-wrap'>
        <h2>Delete Profile</h2>
        { !this.props.updateStatus && this.showPrompt() || this.showMessage() }
      </div>
    );
  }
}

export default DeleteProfile;