import React from 'react';
import styled from 'react-emotion';
import SmartBarChart from './SmartBarChart';
import dataFields from '../../logic/data-fields';
import Card from '@material-ui/core/Card';

const Card$ = styled(Card)`
  margin: 5px;
  padding: 10px;
`;
const Title = styled.h2`
    font-size: 16px;
    margin: 0;
`;
const ChartCard = (props) => (
  <Card$>
    <Title>{dataFields.charts[props.fieldId].label}</Title>
    <SmartBarChart {...props}/>
  </Card$>
);

export default ChartCard;