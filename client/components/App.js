import React, { Component } from 'react';

import '../style/App.css';

import Header_cont from '../containers/Header_cont';
import Main_cont from '../containers/Main_cont';

import Footer from './Footer';

class App extends Component {
  componentDidUpdate() {
    this.setMainMarginTop();
  }

  setMainMarginTop = () => {
    const header = document.getElementsByTagName('header')[0];
    const main = document.getElementsByTagName('main')[0];

    const height = header.offsetHeight;
    main.style.marginTop = height + 'px';
    main.style.marginBottom = height + 'px';
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
