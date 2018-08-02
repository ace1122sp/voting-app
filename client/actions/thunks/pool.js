export const fetchPoolCards = url =>
  dispatch => {
    return fetch(url)
      .then()
      .catch();
  }

export const fetchNewPool = (url, package) =>
  dispatch => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        name: package.name,
        options: package.options
      }),
      headers: { "Content-type": "application/json" }
    };
    return fetch(url, options)
      .then()
      .catch();
  }

export const fetchPool = url =>
  dispatch => {
    return fetch(url)
      .then()
      .catch();
  }

export const fetchPoolDelete = url =>
  dispatch => {
    const options = {
      method: 'DELETE'
    };
    return fetch(url, options)
      .then()
      .catch();
  }

export const fetchVote = (url, optionId) =>
  dispatch => {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        optionId
      }),
      headers: { "Content-type": "application/json" }
    };
    return fetch(url, options)
      .then()
      .catch();
  }

export const fetchFollow = url =>
  dispatch => {
    const options = {
      method: 'PATCH'
    };
    return fetch(url, options)
      .then()
      .catch();
  }

export const fetchUnfollow = url =>
  dispatch => {
    const options = {
      method: 'DELETE'
    };
    return fetch(url, options)
      .then()
      .catch();
  }

export const fetchOptionAdd = (url, package) =>
  dispatch => {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        id: package.id,
        value: package.value
      }),
      headers: { "Content-type": "application/json" }
    };
    return fetch(url, options)
      .then()
      .catch();
  }

export const fetchOptionRemove = url =>
  dispatch => {
    const options = {
      method: 'DELETE'
    };
    return fetch(url, options)
      .then()
      .catch();
  }