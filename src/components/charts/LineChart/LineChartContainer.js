import React, {Component} from 'react';
import {connect} from "react-redux";
import styled from 'react-emotion';
import {mem} from '../../../logic/utils';
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
const getChartData = mem(
  (selection, data) =>
  selection.map(packId => ({
    packId,
    data: data[packId].map(o => ({...o, packId})),
  }))
);
// Indexing month order by month id. Ex: { '2017-09':0, '2017-10':1,...}
const getMonthIndex = mem( (chartData) => values(chartData)[0].map( o => o.month )
    .reduce( (acc, month, i) => { acc[month] = i + 1; return acc }, {})
);
class LineChartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedMonth: null,
      mousePosition: [],
      showOverlay: false,
    }
  }
  static getDerivedStateFromProps = (props, state) => {
    const focusedMonth = state.focusedMonth || last(keys(getMonthIndex(props.data)));
    return {focusedMonth};
  };
  handleMouseEnter = (event) => {
    let node = event.currentTarget;
    const packId = node.className.baseVal.split(' ')[1];
    this.setState({
      mousePosition: [event.pageX, event.pageY],
      showOverlay: true,
    });
    setFocus(packId);
  };
  handleMouseLeaveChart = (event) => {
    this.setState({showOverlay: false});
  };
  setFocusedMonth = (month) => {
    this.setState({focusedMonth: month});
  };
  render () {
    const {props:{data, selection}, state:{focusedMonth}} = this;
    if( isEmpty(selection) || isEmpty(data) || lacksElementsOf(selection, keys(data)) ) return null;
    const monthIndex = getMonthIndex(data)[focusedMonth];
    return (
      <MeasureWrapper>
        { ({width, height}) =>
          <StyleWrapper
            {...{monthIndex}}
            onMouseLeave={this.handleMouseLeaveChart}
          >
            <LineChartFn
              {...{
                data: getChartData(selection, data),
                selection,
                height: height - 40,
                width,
                handleMouseEnter: this.handleMouseEnter,
                setFocusedMonth: this.setFocusedMonth
              }}
            />
            <LineChartOverlay
              {...{
                show: this.state.showOverlay,
                focusedMonth,
                selection,
                data: data,
                mousePosition: this.state.mousePosition
              }}
            />
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