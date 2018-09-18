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
    this.props.handleMouseEnterSlider(event);
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
    const {popupStyle: style, value, min, max, step, onChange} = this.props;
    const { anchorEl, open } = this.state;
    return (
        <Fragment>
          <span
            onMouseEnter={this.handleMouseEnter}
            className="popslider value"
          >
            {this.props.children}
          </span>
          <Popper
            {...{open, anchorEl, style}}
            modifiers={{
              offset: {
                enabled: true,
                offset: '0px, -15px '
              },
              flip: {
                enabled: false,
              }
            }}
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