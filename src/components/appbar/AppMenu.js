import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ColorDialog from './ColorDialog';
import SwitchLocale from './SwitchLocale';
import styled from "react-emotion";

const StyledMenu = styled(Menu)`
  font-size: 0.8rem;
  color: #802;
  .button {
    display: flex;
    align-items: center;

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
  wrapperRef = React.createRef();
  
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  initialClick = (el) => {
    setTimeout( () => el.querySelector('#app-menu-button').click(), 5000);

  };
  simulateClick() {
    this.wrapperRef.current.querySelector('#app-menu-button').click();
  };
  componentDidMount() {
    setTimeout(this.simulateClick.bind(this), 2000);
  }
  render() {
    const { anchorEl } = this.state;

    return (
      <div ref={this.initialClick}>
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