import React from 'react';
import Popover from '@material-ui/core/Popover';
import styled from "react-emotion";
import ColorSliders from './ColorSliders';
import img from '../../assets/img';

const ColorDialogButton = styled.div`
  height: 42px;
`;
const Icon = styled.img`
  height: 100%;
  width:auto;
`;

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
      <div>

        <ColorDialogButton
          aria-owns={open ? 'simple-popper' : null}
          aria-haspopup="true"
          variant="contained"
          onClick={this.handleClick}
        >
          <Icon src={img.colorWheel}/>
        </ColorDialogButton>
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
      </div>
    );
  }
}export default ColorDialog;