import React, {Component} from 'react';
import {connect} from "react-redux";
import styled from 'react-emotion';
import mem from 'mem';
import isEmpty from "lodash/isEmpty";
import LineChartFn from './LineChartView';
import LineChartOverlay from './LineChartOverlay';
import {keys, last, pipe, values} from 'ramda';
import {setFocus} from "../../../logic/focus";
import MeasureWrapper from './MeasureWrapper';
const {lacksElementsOf} = require('../../../logic/vibl-fp');

const StyleWrapper = styled.div`
  ${({monthIndex}) => `
    .VictoryContainer > svg > g > path:nth-child(${monthIndex}) {
      stroke-width: 6px !important;
    }
  `
}`;
// Indexing month order by month id. Ex: { '2017-09':0, '2017-10':1,...}
const getMonthIndex = mem( (chartData) => values(chartData)[0].map( o => o.month )
    .reduce( (acc, month, i) => { acc[month] = i + 1; return acc }, {})
);
class LineChartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedMonth: null,
    }
  }
  handleMouseEnter = (event) => {
    let node = event.currentTarget;
    const packId = node.className.baseVal.split(' ')[1];
    setFocus(packId);
  };
  setFocusedMonth = (month) => {
    this.setState({focusedMonth: month});
  };
  getDerivedStateFromProps(props, state) {
    const focusedMonth = state.focusedMonth || last(keys(getMonthIndex(props.data)));
    return {focusedMonth};
  }
  render () {
    const {props:{data, selection}, state:{focusedMonth}} = this;
    if( isEmpty(selection) || isEmpty(data) || lacksElementsOf(selection, keys(data)) ) return null;
    const monthIndex = getMonthIndex(data)[focusedMonth];
    const chartData = selection.map(packId => ({
      packId,
      data: data[packId].map(o => ({...o, packId})),
    }));
    return (
      <MeasureWrapper>
        { ({width, height}) =>
          <StyleWrapper {...{monthIndex}}>
            <LineChartFn {...{
              data: chartData,
              selection,
              height: height - 40,
              width,
              handleMouseEnter: this.handleMouseEnter,
              setFocusedMonth: this.setFocusedMonth
          }}/>
            <LineChartOverlay {...{focusedMonth, selection, data: data}}/>
          </StyleWrapper>
        }
      </MeasureWrapper>
    );
  }
}
const mapStateToProps = (state) => ({
  focus: state.focus,
  selection: state.selection,
});
export default connect(mapStateToProps)(LineChartContainer);