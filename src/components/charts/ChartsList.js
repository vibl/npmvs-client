import React from 'react';
import {connect} from 'react-redux';
import styled from 'react-emotion';
import {splitAt} from 'ramda';
import ChartCard from './ChartCard';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const Column = styled.div`
    flex: 1 1 200px;
    min-width: 450px;
`;
const ChartsList = ({chartsData, chartsList}) => {
  const columnSize = Math.round(chartsList.length / 2);
  const columns = splitAt(columnSize, chartsList);
  return (
    <Container>
      { columns.map ( (charts, i) =>
        <Column>
          { charts.map( fieldId => (
              <ChartCard key={fieldId} fieldId={fieldId} data={chartsData[fieldId]} />
          ))}
        </Column>
      )}
    </Container>
  )
};

const mapStateToProps = (state) => ({
  chartsData: state.charts,
  chartsList: state.chartsList,
});
export default connect(mapStateToProps)(ChartsList);