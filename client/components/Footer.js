import React from 'react';
import '../style/Footer.css';

const Footer = props => {
  return (
    <footer>
      <div>
        <p>
          This web app is created for freeCodeCamp project task. It is part of my studying process and because of that, it may have some security
          vulnerabilities. Please do not store any sensitive information in the app and do not use passwords which you are using in other apps.
        </p>
      </div>
      <section>
        <address>
          <p>coded by ace11</p>
        </address>
        <ul className='social-media'>
          <li><a href='https://github.com/ace1122sp' target='_blank'><i className='fa fa-github' aria-hidden='true'></i> github</a></li>
          <li><a href='https://www.linkedin.com/in/aleksandar-bulovi%C4%87-83aa74139/' target='_blank'><i className='fa fa-linkedin' aria-hidden='true'></i> linkedin</a></li>
          <li><a href='https://www.freecodecamp.com/ace1122sp' target='_blank'><i className='fa fa-free-code-camp' aria-hidden='true'></i> freecodecamp</a></li>
          <li><a href='https://codepen.io/ace1122/' target='_blank'><i className='fa fa-codepen' aria-hidden='true'></i> codepen</a></li>
          <li><a href='https://ace1122sp.github.io/portfolio/' target='_blank'><i className='fa fa-code' aria-hidden='true'></i> portfolio</a></li>
        </ul>
      </section>
    </footer>
  );
}

export default Footer;
