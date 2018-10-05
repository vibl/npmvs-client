import React from 'react';
import l from '../../util/localiz';
import {clearHideTimeout} from '../util/popup-display-hide';
import {switchLanguage} from "../../util/localiz";
import flags from '../../assets/img/flags-square-faded.jpg';
import {ReactComponent as FlagFr} from '../../assets/img/flag-fr-4x3.svg';
import {ReactComponent as FlagEn} from '../../assets/img/flag-gb-4x3.svg';

const handleClick = () => {
  switchLanguage();
};
const SwitchLocale = ({children}) => {
  return (
    <div
      className="locale-switcher button"
      onClick={handleClick}
      onMouseEnter={clearHideTimeout}
    >
      <div className="icon">
        {l([<FlagFr/>,<FlagEn/>])}
        {/*<img src={flags} alt="Switch locale"/>*/}
      </div>
      <div className="label">
       {l`Version française<>Switch to English version`}
      </div>
    </div>
  )
};
export default SwitchLocale;