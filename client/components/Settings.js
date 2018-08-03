import React from 'react';

const Settings = props => {
  // implement functionality

  // props --> changePassword() deleteProfile() username
  return (
    <div>
      <h1>Settings</h1>
      <h2>{props.username}</h2>
      <form>
        <input type='button' value='change password' /><br />
        <br /><br />
        <input type='button' value='Delete Profile' /><br />
        <br />
      </form><br />
    </div>
  );
}

export default Settings;
