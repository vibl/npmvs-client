import React from 'react';
import styled from 'react-emotion';
import SmartBarChart from './SmartBarChart';
import fields from '../../logic/data-fields';
import Card from '@material-ui/core/Card';
import LineChart from "./LineChart";

const Card$ = styled(Card)`
  margin: 5px;
  padding: 10px;
`;
const Title = styled.h2`
    font-size: 16px;
    margin: 0;
`;
const ChartComponents = {LineChart, SmartBarChart};

const ChartCard = (props) => {
  const {fieldId} = props;
  const field = fields[fieldId];
  const ChartComponent = ChartComponents[field.component];
  return (
    <Card$>
      <Title>{field.label}</Title>
      { fieldId === 'downloads'
        ? <LineChart {...props}/>
        : <SmartBarChart {...props}/>
      }
      {/*<ChartComponent {...props}/>*/}
    </Card$>
  );
};


export default ChartCard;