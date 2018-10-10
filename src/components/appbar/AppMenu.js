import React from 'react';
import styled from "react-emotion";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import hamburgeMenuIcon from '../../assets/img/hamburger-menu-icon.png';
import MenuItem from '@material-ui/core/MenuItem';
import {disableBlinkerTarget, registerBlinkerTarget} from "../util/Blinker";
import ColorDialogMenuEntry from '../color-dialog/ColorDialogMenuEntry';
import SwitchLocale from './SwitchLocale';
import {registerPopup} from '../util/popup-display-hide';


const StyledMenu = styled(Menu)`
    font-size: 0.8rem;
    color: #802;
    
    li {
      height: 2.7rem;
      line-height: unset;
      padding: 0 !important;
    }
  .button {
    display: flex;
    align-items: center;
    box-shadow: none;
    height: 100%;
    padding: 0 0.7rem;
    width: 100%;

    .icon {
      width: 1.6rem;
      
      img {
        display: block;
        height: 1.3rem;
        width: auto;
        margin: auto;
      }
      svg {
        display: block;
        width: auto;
        margin: auto;
      }
    }
    .label {
      margin-left: 0.7rem;
    }
    &.color-dialog .icon img {
        height: 1.6rem;
    }
  }
`;
class AppMenu extends React.Component {
  state = {
    anchorEl: null,
  };
  componentDidMount() {
    registerPopup('ColorDialog');
    registerBlinkerTarget({
      id: 'AppMenuButton',
      css: `#app-menu-button { 
              box-shadow: inset 0 0 2px 0 #802, 0 0 2px 0 #802
            }`,
      pattern: '3x200+4000',
    });
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
    disableBlinkerTarget('AppMenuButton');
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { anchorEl } = this.state;
    return (
      <div>
        <div
          id="app-menu-button"
          aria-owns={anchorEl ? 'app-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <img className="icon" src={hamburgeMenuIcon} alt="menu-icon"/>
        </div>
        <StyledMenu
          id="app-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}><ColorDialogMenuEntry/></MenuItem>
          <MenuItem onClick={this.handleClose}><SwitchLocale/></MenuItem>
        </StyledMenu>
      </div>
    );
  }
}

export default AppMenu;