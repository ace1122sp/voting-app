import React from 'react';
import Header from './Header'
import Footer from './Footer';
import Home from './Home';
import Authenticate from './Authenticate';
import Profile from './Profile';
import Settings from './Settings';
import CreatePool from './CreatePool';
import Pool from './Pool';

const App = () =>
  <div>
    <Header />
    <Home />
    <Footer />
  </div>

module.exports = App;
