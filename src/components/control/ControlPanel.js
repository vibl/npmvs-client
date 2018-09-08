import React from 'react';
import styled from 'react-emotion';
import Selector from "./Selector";
import PackageList from "./PackageList";
import ColorSliders from './ColorSliders';


const Container = styled.div`
  display: flex;
  width: 100%;
`;
const PackSelection = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
`;
const ControlPanel = () => (
  <Container>
    <PackSelection>
      <Selector/>
      <PackageList/>
    </PackSelection>
    <ColorSliders/>
  </Container>
);

export default ControlPanel;