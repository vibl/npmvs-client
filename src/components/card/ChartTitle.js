import React from 'react';
import styled from 'react-emotion';
import InfoTip from './InfoTip';

const StyledTitle = styled.h2`
    color: #880022;
    font-size: 0.8em;
    font-weight: 500;
    text-align: center;
    margin: 5px 0 10px 0;
`;
const ChartTitle = ({description, children, className}) => (
  <StyledTitle {...{className}}>
    {children}
    <InfoTip {...{description}} />
  </StyledTitle>
);
export default ChartTitle;