import React from 'react';
import {clearHideTimeout} from '../infopage/infopage-display-hide';
import {switchLanguage} from "../../logic/localiz";
import flags from '../../assets/img/flags.jpg';

const handleClick = () => {
  switchLanguage();
};
const SwitchLocale = () => {
  return (
    <div
      className="locale-switcher"
      onClick={handleClick}
      onMouseEnter={clearHideTimeout}
    >
      <img src={flags} alt="Switch locale"/>
    </div>
  )
};
export default SwitchLocale;