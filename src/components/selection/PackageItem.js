import React, {PureComponent} from 'react';
import {prop} from 'ramda';
import Color from 'color';
import {deselectPackage} from '../../logic/router';
import {linearGradient} from "../../util/utils";
import {setFocus} from "../../logic/focus";
import {displayPopup, hidePopupAfterTimeout} from "../util/popup-display-hide";
import {disableBlinkerTarget} from "../util/Blinker";

class PackageItem extends PureComponent {

  handleClose = () =>
    deselectPackage(this.props.packName);

  handleMouseEnter = () => {
    disableBlinkerTarget('Selection');
    setFocus(this.props.packName);
    displayPopup('InfoPage');

  };
  handleMouseLeave = () =>
    hidePopupAfterTimeout('InfoPage', 300);

  render() {
    const {packName, color, hasFocus} = this.props;
    const {baseColor, colorDarker} = color;
    const baseColorObj = Color(baseColor);
    const style = {
      background: linearGradient(baseColor, 0.1, -0.3),
      boxShadow: hasFocus
        ? `0 0 3px 3px ${colorDarker}, inset -1px -1px 1px 0px ${colorDarker}`
        : `0 0 2px 0 ${baseColor}`,
      border: `1px solid ${baseColor}`,
      color: baseColorObj.darken(0.5),
  };

    return (
      <div className="package" {...{style}}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="name">{packName}</div>
        <div className="close button" onClick={this.handleClose}/>
      </div>
    );
  }
}
export default PackageItem;