import React from 'react';
import styled from 'react-emotion';
import Selector from "../selector/Selector";
// import Selector from "../selector/Selector";
import {hideInfoPageAfterTimeoutIfEntered} from '../infopage/infopage-display-hide';
import AppMenu from "./AppMenu";
import Logo from './Logo';

const StyledWrapper = styled.div`
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
    .package-selector {
      flex-grow: 1;
      margin: .2rem 0 0 0;
    }
    #app-menu-button {
      padding: 0.4rem;
      min-width: 2rem;

      span {
        padding: 0.2rem;
      }
    }
`;
const handleMouseEnter = () => {
  hideInfoPageAfterTimeoutIfEntered(100);
};
const AppBar = () => (
  <StyledWrapper onMouseEnter={handleMouseEnter}>
    <Logo/>
    <Selector/>
    <AppMenu/>
  </StyledWrapper>
);

export default AppBar;