import React, {PureComponent} from 'react';
import {deselectPackage} from '../../logic/router';
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
    const {packName} = this.props;
    return (
      <div className="package"
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