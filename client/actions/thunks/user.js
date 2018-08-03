import { loadUser, unloadUser, updateUser } from '../user';

// think about creating fetchGenerator for all fethc functions

export const fetchRegister = (url, package) => 
  dispatch => {
    const options = {
      method: 'POST',
      body: JSON.stringify(
        { 
          username: package.username, 
          password: package.password,
          email: package.email
        }
      ),
      headers: { "Content-type": "application/json" }
    };
    return fetch(url, options)
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Bad request');
      })
      .then(user => {
        dispatch(loadUser(user));
      })
      .catch(err => {
        // send some info about err to user
        console.error(err.message);
      });
  }

export const fetchLogin = (url, package) =>
  dispatch => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        username: package.username,
        password: package.password
      }),
      headers: { "Content-type": "applications/json" }
    };
    return fetch(url, options)
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Bad request');
      })
      .then(res => {
        dispatch(loadUser(user));
      })
      .catch(err => {
        // send some info about err to user
        console.error(err.message);
      });
  }

export const fetchLogout = url =>
  dispatch => {
    return fetch(url)
      .then(res => {
        if (res.ok) return true;
        throw new Error('Bad request');
      })
      .then(res => {  
        dispatch(unloadUser());
      })
      .catch(err => {
        // inform user about err 
        console.error(err.message);
      });
  }

export const fetchUser = url =>
  dispatch => {
    return fetch(url)
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Bad request');
      })
      .then(res => {
        dispatch(loadUser(user));
      })
      .catch(err => {
        // send some info about err to user
        console.error(err.message);
      });
  }

export const fetchUserUpdate = (url, newPassword) =>
  dispatch => {
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        newPassword
      }),
      headers: { "Content-type": "application/json" }
    };
    return fetch(url, options)
      .then(res => {
        if (res.ok) return true;
        throw new Error('Bad request');
      })
      .then(res => {
        dispatch(updateUser('Your password has been successfuly changed!'));
      })
      .catch(err => {
        // inform user about error
        console.error(err.message);
      });
  }

export const fetchUserDelete = url =>
  dispatch => {
    const options = {
      method: 'DELETE'
    };
    return fetch(url, options)
      .then(res => {
        if (res.ok) return true;
        throw new Error('Bad request');
      })
      .then(res => {
        dispatch(updateUser('Your profile has been deleted!'))
      })
      .catch(err => {
        // inform user about error
        console.error(err.message);
      });
  }