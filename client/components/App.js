import React, { Component } from 'react';

import '../style/App.css';

import Header_cont from '../containers/Header_cont';
import Main_cont from '../containers/Main_cont';

import Footer from './Footer';

import { general } from '../util/general';

class App extends Component {
  componentDidUpdate() {
    general.setMainMarginTop();
  }

  render() {
    return (
      <div>
        <Header_cont />
        <Main_cont />
        <Footer />
      </div>
    );
  }
}

export default App;
