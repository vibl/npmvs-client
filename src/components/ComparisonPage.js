import React from 'react';
import styled from 'react-emotion';
import ControlPanel from './control/ControlPanel';
import DashBoard from './charts/DashBoard';

const Background = styled.div`
  background-color: hsl(40, 20%, 95%);
`;
const ComparisonPage = () => (
    <Background>
      <ControlPanel/>
      <DashBoard/>
    </Background>
);
export default ComparisonPage;
