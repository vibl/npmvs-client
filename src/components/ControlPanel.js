import React from 'react';
import styled from 'react-emotion';
import Selector from "./Selector";
import PackList from "./PackageList";
import ColorSliders from './ColorSliders';


const Container = styled.div`
  display: flex;
`;
const PackSelection = styled.div`
  display: flex;
  flex-direction: column;
`;
const ControlPanel = () => (
  <Container>
    <PackSelection>
      <Selector/>
      <PackList/>
    </PackSelection>
    <ColorSliders/>
  </Container>
);

export default ControlPanel;