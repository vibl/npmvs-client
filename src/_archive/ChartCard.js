import React from 'react';
import {pure} from 'recompose';
import styled from 'react-emotion';
import Card from '@material-ui/core/Card';
import InfoIcon from '@material-ui/icons/Info';
import {pipe} from "ramda";
import BarChart from '../charts/BarChart/index';
import LineChart from "../charts/LineChart/index";
import RichTip from '../generic/RichTip';

const StyledCard = styled(Card)`
    padding: 10px 15px 5px 15px;
    align-items: center;
    margin: 12px 4px;
    height: ${ props => props.fieldid === 'monthlyDownloadsSeries' ? 'calc(100% - 24px)' : 'auto' };
`;
const Title = styled.h2`
    color: #555;
    font-size: 0.8em;
    font-weight: 500;
    text-align: center;
    margin: 5px 0 10px 0;
`;
const Info = styled(InfoIcon)`
    display: inline;
    color: #ccc;
    height: 0.7rem !important;
`;
const ChartComponents = {BarChart, LineChart};

const StyledRichTip = styled(RichTip)`
    background: white;
    font-family: "Roboto", sans-serif;
    font-size: 0.6em;
    color: #333;
    margin: 0;
    max-width: 23rem;
    > div {
      margin: 0.6rem;
    }
    ol {
      margin: 0;
      padding: 0 0 0 0.6rem;
    }
    ol li, p {
      margin: 0.3rem 0;
    }
`;
const InfoTip = ({description}) => (
  <StyledRichTip
    button={Info}
    content={description}
  />
);
const ChartCard = (props) => {
  const {fieldId, label, description, component, column} = props;
  const ChartComponent = ChartComponents[component];
  return (
    <StyledCard fieldid={fieldId}>
      <Title>{label}<InfoTip {...{description}}/></Title>
      <ChartComponent {...props}/>
    </StyledCard>
  );
};
export default pipe(
  pure,
)(ChartCard);