import React from 'react';
import {connect} from 'react-redux';
import styled from 'react-emotion';
import {equals, keys, splitAt, values} from 'ramda';
import isEmpty from 'lodash/isEmpty';
import ChartCard from './ChartCard';

const barChartColumnSize = 3 ;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const Column = styled.div`
    flex: 1 1 200px;
    min-width: 250px;
`;
const ChartsList = ({chartsData, barChartList}) => {
  const columns = splitAt(barChartColumnSize, barChartList);
  const downloadsLineChartId = 'downloadsLineChart';
  return keys(chartsData).length < 6 ? null :
    <Container>
      { columns.map ( (charts, i) =>
        <Column key={i}>
          { charts.map( fieldId => (
              <ChartCard key={fieldId} fieldId={fieldId} data={chartsData[fieldId]} />
          ))}
        </Column>
      )}
      <Column>
        <ChartCard key={downloadsLineChartId} fieldId={downloadsLineChartId} data={chartsData[downloadsLineChartId]} />
      </Column>
    </Container>
};

const mapStateToProps = (state) => ({
  chartsData: state.charts,
  barChartList: state.barChartList,
});
export default connect(mapStateToProps)(ChartsList);