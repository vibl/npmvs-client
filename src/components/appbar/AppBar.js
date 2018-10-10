import React, {PureComponent} from 'react';
import styled from 'react-emotion';
// import Selector from "../selector/Selector";
import AppMenu from "./AppMenu";
import Logo from './Logo';
import Spinner from './Spinner';
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
        border-radius: 4px;
        height: 2.7rem;
        margin: 0 0.2rem;
        padding: 0.4rem;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      
        img.icon {
          height: 100%;
          width: auto;
        }
    }
`;

class AppBar extends PureComponent {
   render() {
     return  (
       <StyledWrapper>
         <Logo/>
         <Spinner/>
         {/*<Selector/>*/}
         <Selection/>
         <Search/>
         <ColorDialog/>
         <AppMenu/>
       </StyledWrapper>
     );
   }
}
export default AppBar;