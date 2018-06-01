import React from 'react';

const Settings = props => {
  return (
    <div>
      <h3>Settings</h3>
      <form>
        <label>username</label><br />
        <input type='text' value='username' />
        <input type='submit' value='change' /><br />
        <br />
        <label>email</label><br />
        <input type='email' value='email' />
        <input type='submit' value='change' /><br />
        <br />
        <input type='button' value='change password' /><br />
        <br />
        <input type='button' value='Delete Account' /><br />
        <br />
      </form><br />
    </div>
  );
}

export default Settings;
