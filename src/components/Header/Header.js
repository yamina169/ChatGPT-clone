/*import React from 'react'
import './Header.css'
import { Link} from 'react-router-dom';

import logo from '../../images/logo.png'

const Header = () => {
  
  return ( 
    <nav className="navbar navbar-light bg-white" >
      <a className="navbar-brand" href="/Front-end/src/pages/CreateAccount.js">
        <img src={logo} width="142" height="45" alt=""/>
      </a>
    </nav>
  );
};

export default Header;*/
import React from 'react'
import './Header.css'
import { Link} from 'react-router-dom';

import logo from '../../images/logo.png'

const Header = () => {
  
  return ( 
    <nav className="navbar navbar-light bg-white" >
      <a className="navbar-brand" href="/Home">
        <img src={logo} width="100" height="30" alt=""/>
      </a>
    </nav>
  );
};

export default Header;