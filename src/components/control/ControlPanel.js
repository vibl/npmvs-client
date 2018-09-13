import React from 'react';
import styled from 'react-emotion';
import Selector from "./Selector";
import ColorDialog from './ColorDialog';

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
    </PackSelection>
    <ColorDialog/>

  </Container>
);

export default ControlPanel;