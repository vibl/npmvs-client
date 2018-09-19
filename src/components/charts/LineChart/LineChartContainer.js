import React, {Component} from 'react';
import {connect} from "react-redux";
import styled from 'react-emotion';
import {mem} from '../../../logic/utils';
import LineChartFn from './LineChartView';
import LineChartOverlay from './LineChartOverlay';
import {keys, last, pipe, values} from 'ramda';
import {setFocus} from "../../../logic/focus";
import MeasureWrapper from './MeasureWrapper';
const {isEmpty, notEmpty, lacksElementsOf} = require('../../../logic/vibl-fp');

const StyleWrapper = styled.div`
  position: relative;
  
  ${({monthIndex}) => `
    .VictoryContainer > svg > g > path:nth-child(${monthIndex}) {
      stroke-width: 6px !important;
    }
  `
}`;
const getChartData = mem(
  (selection, data) =>
  selection.map( (packId) => {
    return data[packId] && ({
      packId,
      data: data[packId].map(o => ({...o, packId})),
    })
  })
    .filter(notEmpty)
);
// Indexing month order by month id. Ex: { '2017-09':0, '2017-10':1,...}
const getMonthIndex = mem( x => {
  if( !x ) return null;
  x = values(x);
  if( !x ) return null;
  x = x.filter(notEmpty)[0];
  if( !x ) return null;
  x = x.map( o => o.month )
    .reduce( (acc, month, i) => { acc[month] = i + 1; return acc }, {})
  return x;
});
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
  handleMouseEnterMonth = (event) => {
    let node = event.currentTarget;
    const packId = node.className.baseVal.split(' ')[1];
    this.setState({
      mousePosition: [event.pageX, event.pageY],
    });
    setFocus(packId);
  };
  handleMouseEnterChart = (event) => {
    this.setState({
      showOverlay: true,
    });
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
        { ({width, height}) => {
          return ! ( width > 0 && height > 0) ? null : (
            <StyleWrapper
              {...{monthIndex}}
              onMouseEnter={this.handleMouseEnterChart}
              onMouseLeave={this.handleMouseLeaveChart}
            >
              <LineChartFn
                {...{
                  data: getChartData(selection, data),
                  selection,
                  height: height - 10,
                  width,
                  handleMouseEnterMonth: this.handleMouseEnterMonth,
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
            )
        }}
      </MeasureWrapper>
    );
  }
}
const mapStateToProps = (state) => ({
  focus: state.focus,
  selection: state.selection,
});
export default connect(mapStateToProps)(LineChartContainer);