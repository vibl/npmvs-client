import React from 'react';
import styled from 'react-emotion';
import Selector from "./Selector";
// import Selector from "../selector/Selector";
import ColorDialog from './ColorDialog';
import SwitchLocale from './SwitchLocale';
import logo from '../../assets/img/logo.png';
import {hideInfoPageAfterTimeoutIfEntered} from '../infopage/infopage-display-hide';

const Toolbar = styled.div`
    display: flex;
    position: relative; // Allow child elements to be positionned as absolute.
    align-content: center;
    width: 100%;
    height: 2.7rem;
  
    #logo {
      
      img {
        height: 3rem;
        width: 9rem;
      }
    }
    .color-dialog.button {
      height: 100%;
      padding: 0.15rem 0.15rem;
      
      img {
        height: 100%;
        width:auto;
      }
    }
    .package-selector {
      flex-grow: 1;
      margin: .2rem 0 0 0;
    }
    .locale-switcher {
        height: 100%;
        padding: 0.4rem;
      
        img {
          height: 100%;
          width: auto;
        }
    }
`;
const handleMouseEnter = () => {
  hideInfoPageAfterTimeoutIfEntered(100);
};
const ControlPanel = () => (
  <Toolbar onMouseEnter={handleMouseEnter}>
    <div id="logo">
      <img src={logo}/>
    </div>
    <Selector/>
    <ColorDialog/>
    <SwitchLocale/>
  </Toolbar>
);

export default ControlPanel;