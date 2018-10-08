import React from 'react';
import colorWheel from '../../assets/img/color-wheel.png';
import l from "../../util/localiz";
import {displayPopup} from '../util/popup-display-hide';

const handleClick = () => {
  displayPopup('ColorDialog');
};
const ColorDialogMenuEntry = () => {
  return (
    <div
      className="color-dialog button"
      aria-owns={open ? 'simple-popper' : null}
      aria-haspopup="true"
      variant="contained"
      onClick={handleClick}
    >
      <div className="icon">
        <img src={colorWheel} alt="color-wheel"/>
      </div>
      <div className="label">
        {l`Change colors<>Changer les couleurs`}
      </div>
    </div>
  )
};
export default ColorDialogMenuEntry;