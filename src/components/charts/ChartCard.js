import React from 'react';
import styled from 'react-emotion';
import SmartBarChart from './SmartBarChart';
import fields from '../../logic/data-fields';
import Card from '@material-ui/core/Card';
import LineChart from "./LineChart";

const Card$ = styled(Card)`
  margin: 5px;
  padding: 10px 15px 5px 15px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-items: center;
  flex-direction: column;
`;
const Title = styled.h2`
    color: #444;
    font-size: 16px;
    text-align: center;
    margin: 5px 0 10px 0;
`;
const ChartContainer = styled.div`
    width: 350px;
`;
const ChartComponents = {LineChart, SmartBarChart};

const ChartCard = (props) => {
  const {fieldId} = props;
  const field = fields[fieldId];
  const ChartComponent = ChartComponents[field.component];
  return (
    <Card$>
      <Title>{field.label}</Title>
      <ChartContainer>
        { fieldId === 'downloadsLineChart'
          ? <LineChart {...props}/>
          : <SmartBarChart {...props}/>
        }
        {/*<ChartComponent {...props}/>*/}
      </ChartContainer>
    </Card$>
  );
};


export default ChartCard;