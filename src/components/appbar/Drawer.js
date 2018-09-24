import React, {Component} from 'react';
import MuiDrawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'react-emotion';
import ColorDialog from './ColorDialog';
import SwitchLocale from './SwitchLocale';

const StyledWrapper = styled.div`
  font-size: 0.8rem;
  color: #802;
    
    img {
      height: 1rem;
    }
  .color-dialog.button {
    height: 100%;
    padding: 0.15rem 0.15rem;

    img {
      //height: 2rem;
      width:auto;
    }
  }
  .locale-switcher {
    height: 100%;
    padding: 0.4rem;

    img {
      //height: 1.3rem;;
      width: auto;
    }
  }
`;
class Drawer extends Component {
  state = {
    open: false,
  };
  toggleDrawer = (open) => () => {
    const newState = open !== undefined ? {open} : state => ! state.open;
    this.setState(newState);
  };
  render() {
    const {open} = this.state;
    return (
      <div>
        <Button onClick={this.toggleDrawer(true)}>
          <MenuIcon/>
        </Button>
        <MuiDrawer
          {...{open}}
          anchor='right'
        >
          <StyledWrapper
            // onMouseLeave={this.toggleDrawer(false)}
          >
            <ColorDialog/>
            <SwitchLocale/>
          </StyledWrapper>
        </MuiDrawer>
      </div>
    )
  }
}
export default Drawer;