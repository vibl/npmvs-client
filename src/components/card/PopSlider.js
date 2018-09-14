import React, {Fragment} from 'react';
import Popper from '@material-ui/core/Popper';
import Slider from '@material-ui/lab/Slider';

class PopSlider extends React.Component {
  state = {
    anchorEl: null,
    open: false,
  };
  handleMouseEnter = event => {
    const { currentTarget } = event;
    this.setState({
      anchorEl: currentTarget,
      open: true,
    });
  };
  handleMouseLeave = () => {
    this.timeout = setTimeout(this.close, 300);
  };
  close = () => {
    this.setState({open: false});
  };
  handleMouseEnterSlider = () => {
    clearTimeout(this.timeout);
  };
  render() {
    const {className, content, value, min, max, step, onChange} = this.props;
    const { anchorEl, open } = this.state;
    const id = open ? 'my-popup' : null;

    return (
        <Fragment>
          <span
            aria-describedby={id}
            onMouseEnter={this.handleMouseEnter}
            //
          >
            {this.props.children}
          </span>
          <Popper
            id={id}
            open={open} 
            anchorEl={anchorEl}
            style={{height: '1em', width: '8rem'}}
          >
            <Slider
              onMouseEnter={this.handleMouseEnterSlider}
              onMouseLeave={this.handleMouseLeave}
              {...{value, min, max, step, onChange}}
            />
          </Popper>
        </Fragment>
    );
  }
}

export default PopSlider;