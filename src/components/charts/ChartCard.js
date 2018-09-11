import React from 'react';
import {pure} from 'recompose';
import styled from 'react-emotion';
import BarChart from './BarChart';
import Card from '@material-ui/core/Card';
import LineChart from "./LineChart";
import {pipe} from "ramda";

const Card$ = styled(Card)`
    padding: 10px 15px 5px 15px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-items: center;
    flex-direction: column;
    grid-area: ${ p => p.fieldId};
`;
const Title = styled.h2`
    color: #555;
    font-size: 16px;
    text-align: center;
    margin: 5px 0 10px 0;
`;
const LargeCard$ = styled(Card$)`
    grid-row: 1 / 4;
    grid-column: 2;
`;
const ChartComponents = {BarChart, LineChart};

const ChartCard = (props) => {
  console.log('RENDERING ChartCard for field with focus:', props.fieldId, props.focus);
  const {component, fieldId, label} = props;
  const ChartComponent = ChartComponents[component];
  return (
    <Card$ {...{fieldId}}>
      <Title>{label}</Title>
        <ChartComponent {...props}/>
    </Card$>
  );
};
export default pipe(
  pure,
)(ChartCard);