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
      .then()
      .catch();
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
      .then()
      .catch();
  }

export const fetchLogout = url =>
  dispatch => {
    return fetch(url)
      .then()
      .catch();
  }

export const fetchUser = url =>
  dispatch => {
    return fetch(url)
      .then()
      .catch();
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
      .then()
      .catch();
  }

export const fetchUserDelete = url =>
  dispatch => {
    const options = {
      method: 'DELETE'
    };
    return fetch(url, options)
      .then()
      .catch();
  }