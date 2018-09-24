import React from 'react';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import styled from 'react-emotion';
import ColorDialog from './ColorDialog';
import SwitchLocale from './SwitchLocale';
import Menu, {SubMenu, MenuItem} from 'rc-menu';


const StyledMenu = styled(Menu)`
  ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    
    li {
      height: unset;
      padding: 0;
    }
  }
`;


class SettingsMenu extends React.Component {
  state = {
    anchorEl: null,
  };
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'settings-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <SettingsIcon/>
        </Button>
        <StyledMenu
          id="settings-menu"
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

export default SettingsMenu;