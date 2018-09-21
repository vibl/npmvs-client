import React from 'react';
import styled from 'react-emotion';
import Selector from "./Selector";
// import Selector from "../selector/Selector";
import ColorDialog from './ColorDialog';
import SwitchLocale from './SwitchLocale';
import logo from '../../assets/img/logo.png';
import {hideInfoPageIfEntered} from '../infopage/infopage-display-hide';

const Container = styled.div`
    width: 100%;
    display: flex;
    align-content: center;
`;
const SelectorWrapper = styled.div`
    flex-grow: 1;
    margin: .2rem 0 0 0;
`;
const LogoWrapper = styled.div`
    margin: 0.1rem 0 0 0;
`;
const ColorDialogWrapper = styled.div`
    margin: 0.15rem 0 0 0;
`;
const Logo = styled.img`
    height: 2.5rem;
    width: 7rem;
`;
const ControlPanel = () => (
  <Container onMouseEnter={hideInfoPageIfEntered}>
    <LogoWrapper>
      <Logo src={logo}/>
    </LogoWrapper>
    <SelectorWrapper>
      <Selector/>
    </SelectorWrapper>
    <ColorDialogWrapper>
      <ColorDialog/>
    </ColorDialogWrapper>
    <SwitchLocale/>



  </Container>
);

export default ControlPanel;