import React from 'react';

const Settings = props => {
  return (
    <div>
      <h1>Settings</h1>
      <h2>username</h2>
      <form>
        <input type='button' value='change password' /><br />
        <br /><br />
        <input type='button' value='Delete Profile' /><br />
        <br />
        <input type='submit' value='Save Changes' /><br />
      </form><br />
    </div>
  );
}

export default Settings;
