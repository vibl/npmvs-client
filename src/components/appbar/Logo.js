import React from 'react';
import logo from '../../assets/img/logo.png';

const websiteUrl = "https://npmvs.com"; //TODO: put in config.

const Logo = () => (
  <div id="logo">
    <a href={websiteUrl}>
      <img src={logo}/>
    </a>
  </div>
);
export default Logo;
