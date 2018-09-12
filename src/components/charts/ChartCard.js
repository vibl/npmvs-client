import React from 'react';
import {pure} from 'recompose';
import styled from 'react-emotion';
import Card from '@material-ui/core/Card';
import BarChart from './BarChartContainer';
import LineChart from "./LineChartContainer";
import {pipe} from "ramda";

const FlexCard = styled(Card)`
    padding: 10px 15px 5px 15px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-items: center;
    flex-direction: column;
    grid-area: ${ p => p.fieldid};
`;
const Title = styled.h2`
    color: #555;
    font-size: 16px;
    text-align: center;
    margin: 5px 0 10px 0;
`;
const ChartComponents = {BarChart, LineChart};

const ChartCard = (props) => {
  // console.log('RENDERING ChartCard for field with focus:', props.fieldId, props.focus);
  const {component, fieldId, label} = props;
  const ChartComponent = ChartComponents[component];
  return (
    <FlexCard fieldid={fieldId}>
      <Title>{label}</Title>
        <ChartComponent {...props}/>
    </FlexCard>
  );
};
export default pipe(
  pure,
)(ChartCard);