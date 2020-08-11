import React from 'react';

import facebook from '../images/facebook.svg';
import github from '../images/github.svg';
import linkedin from '../images/linkedin.svg';
import website from '../images/website.svg';

const Navbar = () => {

  return (
    <div className="nav" >
      <div className="navcontent">

        <div className="title">
          Google Keep Clone
        </div>

        <div className="rightnav">
          <a href="https://github.com/kevinphanle" target="_blank" rel="noopener noreferrer">
            <img src={github} alt="" />
          </a>
          <a href="https://kevinphanle.dev/" target="_blank" rel="noopener noreferrer">
            <img src={website} alt="" />
          </a>
          <a href="https://www.linkedin.com/in/kevin-le-b28887158/" target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="" />
          </a>

        </div>
      </div>
    </div>
  )
}

export default Navbar;