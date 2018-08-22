import { loadUser, unloadUser, updateUser, updateBadLoginStatus, updateRegisterStatus } from '../user';
import { fetchingRequest } from '../misc';
import { URL_REGISTER, URL_LOGIN, URL_LOGOUT, URL_PROFILE } from '../../resources/urls';

export const fetchRegister = user => 
  dispatch => {
    const options = {
      method: 'POST',
      mode: 'cors', 
      credentials: 'include',
      body: JSON.stringify(
        { 
          username: user.username, 
          password: user.password,
          email: user.email
        }
      ),
      headers: { 'Content-Type': 'application/json' }
    };
    dispatch(fetchingRequest(true));
    return fetch(URL_REGISTER, options)
      .then(res => res.json())
      .then(res => {
        if (!res.message) return res;
        if (res.message == 'username not available') {
          throw new Error(res.message);
        } else {
          throw new Error('bad request');
        }
      })
      .then(user => {
        dispatch(updateRegisterStatus('ok'));
      })
      .catch(err => {
        dispatch(updateRegisterStatus(err.message));
        console.error(err.message);
      })
      .then(() => {
        dispatch(fetchingRequest(false));
      }); 
  }

export const fetchLogin = user =>
  dispatch => {
    const options = {
      method: 'POST',
      mode: 'cors', 
      credentials: 'include',
      body: JSON.stringify(
        {
          username: user.username,
          password: user.password
        }
      ),
      headers: { 'Content-Type': 'application/json' }
    };
    dispatch(fetchingRequest(true));
    return fetch(URL_LOGIN, options)
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('bad login');
      })  
      .then(user => {
        dispatch(loadUser(user));
      })
      .catch(err => {
        if (err.message == 'bad login') return dispatch(updateBadLoginStatus(true));
        console.log(err);
      })
      .then(() => {
        dispatch(fetchingRequest(false));
      });
  }

export const fetchLogout = () =>
  dispatch => {
    dispatch(fetchingRequest(true));
    return fetch(URL_LOGOUT, { mode: 'cors',  credentials: 'include',})
      .then(res => {
        if (res.ok) return true;
        throw new Error('bad request');
      })
      .then(res => {  
        dispatch(unloadUser());
      })
      .catch(err => {
        // inform user about err 
        console.error(err.message);
      })
      .then(() => {
        dispatch(fetchingRequest(false));
      });
  }

export const fetchUser = () =>
  dispatch => {
    dispatch(fetchingRequest(true));
    return fetch(URL_PROFILE, { mode: 'cors',  credentials: 'include',})
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('bad request');
      })
      .then(user => {
        dispatch(loadUser(user));
      })
      .catch(err => {
        // send some info about err to user
        console.error(err.message);
      })
      .then(() => {
        dispatch(fetchingRequest(false));
      });
  }

export const fetchUserUpdate = (currentPassword, newPassword) =>
  dispatch => {
    const options = {
      method: 'PUT',
      mode: 'cors', 
      credentials: 'include',
      body: JSON.stringify({
        currentPassword,
        newPassword
      }),
      headers: { 'Content-Type': 'application/json' }
    };
    dispatch(fetchingRequest(true));
    return fetch(URL_PROFILE, options)
      .then(res => {
        if (res.ok) {
          dispatch(updateUser('Your password has been successfuly changed!'));
        } else if (!res.ok) {
          dispatch(updateUser('Password has not been changed. Incorrect password.'));        
        }
      })
      .catch(err => {
        console.log(res);
      })
      .then(() => {
        dispatch(fetchingRequest(false));
      });
  }

export const fetchUserDelete = () =>
  dispatch => {
    const options = {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include'
    };
    dispatch(fetchingRequest(true));
    return fetch(URL_PROFILE, options)
      .then(res => {
        if (res.ok) return true;
        throw new Error('bad request');
      })
      .then(res => {
        dispatch(updateUser('Your profile has been deleted!'))
      })
      .catch(err => {
        console.error(err.message);
        dispatch(updateUser('Server Error'));
      })
      .then(() => {
        dispatch(fetchingRequest(false));
      });
  } 