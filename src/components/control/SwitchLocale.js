import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'react-emotion';
import {switchLanguage} from "../../logic/localiz";
import flags from '../../assets/img/flags.jpg';

const Wrapper = styled(Button)`
    height: 42px;

    img {
      height: 100%;
      width: auto;
    }
`;
const handleClick = () => {
  switchLanguage();
};
const SwitchLocale = () => {
  return (
    <Wrapper onClick={handleClick}>
      <img src={flags} alt="Switch locale"/>
    </Wrapper>
  )
};
export default SwitchLocale;