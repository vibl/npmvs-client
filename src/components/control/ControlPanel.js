import React from 'react';
import styled from 'react-emotion';
import Selector from "./Selector";
import ColorDialog from './ColorDialog';
import logo from '../../assets/img/logo.png';

const Container = styled.div`
    display: flex;
    width: 100%;
    align-content: center;
    height: 2rem;
`;
const SelectorWrapper = styled.div`
    flex: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
`;
const LogoWrapper = styled.div`
    flex: auto;
    margin: -0.1rem 0 0 0;
`;
const Logo = styled.img`
    height: 2.5rem;
    width: 7rem;
`;
const ControlPanel = () => (
  <Container>
    <LogoWrapper>
      <Logo src={logo}/>
    </LogoWrapper>
    <SelectorWrapper>
      <Selector/>
    </SelectorWrapper>
    <ColorDialog/>

  </Container>
);

export default ControlPanel;