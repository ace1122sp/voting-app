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
      .then(res => {
        // do something with code 
        // you get users profile 
        // store it in redux store
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
        // do something with code 
        // you get users profile 
        // store it in redux store
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
        // you get the boolean if user successfuly logged out
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
        // do something with code 
        // you get users profile 
        // store it in redux store
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
        // you get boolean if user updated
        // do something next
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
        // you get boolean if user updated
        // do something next
      })
      .catch(err => {
        // inform user about error
        console.error(err.message);
      });
  }