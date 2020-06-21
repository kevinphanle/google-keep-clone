import React from 'react';

import facebook from '../images/facebook.svg';
import github from '../images/github.svg';
import linkedin from '../images/linkedin.svg';

const Navbar = () => {

  return (
    <div className="nav" >
      <div className="title">
        Google Keep Clone
      </div>

      <div className="rightnav">
        <a href="https://github.com/kevinphanle" target="_blank" rel="noopener noreferrer">
          <img src={github} alt="" />
        </a>
        <a href="https://github.com/kevinphanle" target="_blank" rel="noopener noreferrer">
          <img src={facebook} alt="" />
        </a>
        <a href="https://github.com/kevinphanle" target="_blank" rel="noopener noreferrer">
          <img src={linkedin} alt="" />
        </a>

      </div>
    </div>
  )
}

export default Navbar;