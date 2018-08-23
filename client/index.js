import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import App from './components/App';

import { URL_PROFILE } from './resources/urls';
import rootReducer from './reducers';

let initState = {};

fetch(URL_PROFILE, { mode: 'cors',  credentials: 'include',})
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('user not logged in');
  })
  .then(res => {
    initState.user = res;
  })
  .catch(err => {
    console.error(err.message);
  })
  .then(() => {
    const root = document.getElementById('root');
    let store = createStore(rootReducer, initState, applyMiddleware(thunk));

    render(
      <BrowserRouter>
        <Provider store={store} >
          <App />
        </Provider>
      </BrowserRouter>,
      root
    );
  });

