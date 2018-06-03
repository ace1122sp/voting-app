import React from 'react';

const Settings = props => {
  return (
    <div>
      <h3>Settings</h3>
      <form>
        <label>username</label><br />
        <input type='text' value='username' />
        <br /><br />
        <label>email</label><br />
        <input type='email' value='email' />
        <br /><br />
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
