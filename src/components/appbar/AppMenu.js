import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {disableBlinkerTarget, registerBlinkerTarget} from "../utils/Blinker";
import ColorDialog from './ColorDialog';
import SwitchLocale from './SwitchLocale';
import styled from "react-emotion";

const StyledMenu = styled(Menu)`
  font-size: 0.8rem;
  color: #802;
    
  .button {
    display: flex;
    align-items: center;
    box-shadow: none;

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
    registerBlinkerTarget({
      id: 'AppMenuButton',
      selector: '#app-menu-button span:first-child',
      rule: 'box-shadow: inset 0 0 2px 0 #802, 0 0 2px 0 #802',
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
        <Button
          id="app-menu-button"
          aria-owns={anchorEl ? 'app-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MenuIcon/>
        </Button>
        <StyledMenu
          id="app-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}><ColorDialog/></MenuItem>
          <MenuItem onClick={this.handleClose}><SwitchLocale/></MenuItem>
        </StyledMenu>
      </div>
    );
  }
}

export default AppMenu;