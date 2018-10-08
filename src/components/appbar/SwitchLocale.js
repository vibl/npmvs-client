import React from 'react';
import l from '../../util/localiz';
import {switchLanguage} from "../../util/localiz";
import {ReactComponent as FlagFr} from '../../assets/img/flag-fr-4x3.svg';
import {ReactComponent as FlagEn} from '../../assets/img/flag-gb-4x3.svg';

const handleClick = () => {
  switchLanguage();
};
const SwitchLocale = () => {
  return (
    <div
      className="locale-switcher button"
      onClick={handleClick}
    >
      <div className="icon">
        {l([<FlagFr/>,<FlagEn/>])}
      </div>
      <div className="label">
       {l`Version française<>Switch to English version`}
      </div>
    </div>
  )
};
export default SwitchLocale;