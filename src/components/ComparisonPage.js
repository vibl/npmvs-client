import React from 'react';
import styled from 'react-emotion';
import ControlPanel from './control/ControlPanel';
import ChartsList from './charts/ChartsList';

const Wrapper = styled.div`
  background-color: hsl(40, 20%, 95%);
`;
const ComparisonPage = () => (
  <Wrapper>
    <ControlPanel/>
    <ChartsList/>
  </Wrapper>
);

export default ComparisonPage;
