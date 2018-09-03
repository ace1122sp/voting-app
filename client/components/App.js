import React from 'react';

import '../style/App.css';

import Header_cont from '../containers/Header_cont';
import Main_cont from '../containers/Main_cont';

import Footer from './Footer';

const App = () =>
  <div>
    <Header_cont />
    <Main_cont />
    <Footer />
  </div>

export default App;
