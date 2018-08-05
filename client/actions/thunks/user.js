import { loadUser, unloadUser, updateUser } from '../user';
import { URL_REGISTER, URL_LOGIN, URL_LOGOUT, URL_PROFILE } from '../../resources/urls';
// think about creating fetchGenerator for all fethc functions

export const fetchRegister = user => 
  dispatch => {
    const options = {
      method: 'POST',
      body: JSON.stringify(
        { 
          username: user.username, 
          password: user.password,
          email: user.email
        }
      ),
      headers: { "Content-type": "application/json" }
    };
    return fetch(URL_REGISTER, options)
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

export const fetchLogin = user =>
  dispatch => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        username: user.username,
        password: user.password
      }),
      headers: { "Content-type": "applications/json" }
    };
    return fetch(URL_LOGIN, options)
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

export const fetchLogout = () =>
  dispatch => {
    return fetch(URL_LOGOUT)
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

export const fetchUser = () =>
  dispatch => {
    return fetch(URL_PROFILE)
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

export const fetchUserUpdate = newPassword =>
  dispatch => {
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        newPassword
      }),
      headers: { "Content-type": "application/json" }
    };
    return fetch(URL_PROFILE, options)
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

export const fetchUserDelete = () =>
  dispatch => {
    const options = {
      method: 'DELETE'
    };
    return fetch(URL_PROFILE, options)
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