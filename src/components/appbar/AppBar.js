import React from 'react';
import styled from 'react-emotion';
// import Selector from "../selector/Selector";
import AppMenu from "./AppMenu";
import Logo from './Logo';
import Search from '../search/Search';
import Selection from '../selection/Selection';
import ColorDialog from '../color-dialog/ColorDialog';

const StyledWrapper = styled.div`
    display: flex;
    position: relative; // Allow child elements to be positionned as absolute.
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
  
    #logo {
      margin-top: 0.6rem;
      
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

const AppBar = () => (
  <StyledWrapper>
    <Logo/>
    {/*<Selector/>*/}
    <Selection/>
    <Search/>
    <ColorDialog/>
    <AppMenu/>
  </StyledWrapper>
);

export default AppBar;