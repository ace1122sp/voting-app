import React from 'react';

import '../style/Loading.css';

const Loading = () => 
  <main className='wrapper align-center'>
    <div className='loading-wrapper'>
      <span className='loading-span'></span>
      <span className='loading-span'></span>
      <span className='loading-span'></span>
      <span className='loading-span'></span>
    </div>
  </main>

export default Loading;