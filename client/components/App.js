import React from 'react';
import Header_cont from '../containers/Header_cont'
import Footer from './Footer';
import Main from './Main';


const userPrototypeSample = [
  {
    id: '023',
    username: 'ace11',
    email: '111ace@example.fake',
    password: 'read_about_hashing_passwords',
    createdPools: 0,
    followingPools: []
  }
];

const App = () =>
  <div>
    <Header_cont />
    <hr />
    <Main />
    <hr />
    <Footer />
  </div>

export default App;
