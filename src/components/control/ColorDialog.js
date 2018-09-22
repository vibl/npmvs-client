import React, {Fragment} from 'react';
import Popover from '@material-ui/core/Popover';
import styled from "react-emotion";
import ColorSliders from './ColorSliders';
import colorWheel from '../../assets/img/color-wheel.png';

class ColorDialog extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Fragment >
        <div
          className="color-dialog button"
          aria-owns={open ? 'simple-popper' : null}
          aria-haspopup="true"
          variant="contained"
          onClick={this.handleClick}
        >
          <img src={colorWheel}/>
        </div>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <ColorSliders/>
        </Popover>
      </Fragment>
    );
  }
}export default ColorDialog;