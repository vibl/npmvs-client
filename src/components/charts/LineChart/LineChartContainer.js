import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {mem} from '../../../util/utils';
import LineChartController from './LineChartController';
import LineChartOverlay from './LineChartOverlay';
import StyledLineChartWrapper from './StyledLineChartWrapper';
import {keys, last, pipe, values} from 'ramda';
const {isBlank, notEmpty, lacksElementsOf} = require('../../../util/vibl-fp');

const getMonthIndex = mem( x => {
  if( !x ) return null;
  x = values(x).filter(notEmpty);
  if( !x ) return null;
  x = x[0];
  if( !x ) return null;
  x = x.map( o => o.month )
    .reduce( (acc, month, i) => { acc[month] = i + 1; return acc }, {})
  return x;
});
class LineChartContainer extends PureComponent {
  state = {
    focusedMonth: null,
    showOverlay: false,
  };
  static getDerivedStateFromProps = (props, state) => {
    const focusedMonth = state.focusedMonth || last(keys(getMonthIndex(props.data)));
    return {focusedMonth};
  };
  setFocusedMonth = (month) => {
    this.setState({focusedMonth: month});
  };
  handleMouseEnterChart = (event) => {
    this.setState({
      showOverlay: true,
    });
  };
  handleMouseLeaveChart = (event) => {
    this.setState({showOverlay: false});
  };

  render () {
    const {props:{data, selection}, state:{focusedMonth}, setFocusedMonth} = this;
    if( isBlank(selection) || isBlank(data) || lacksElementsOf(selection, keys(data)) ) return null;
    const monthIndex = getMonthIndex(data)[focusedMonth];
    return (
      <StyledLineChartWrapper
        {...{monthIndex}}
        onMouseEnter={this.handleMouseEnterChart}
        onMouseLeave={this.handleMouseLeaveChart}
      >
        <LineChartController
          {...{
            data,
            selection,
            setFocusedMonth,
          }}
        />
        <LineChartOverlay
          {...{
            show: this.state.showOverlay,
            focusedMonth,
            selection,
            data,
            mousePosition: this.state.mousePosition
          }}
        />
      </StyledLineChartWrapper>
    );
  }
}
const mapStateToProps = (state) => ({
  selection: state.selection,
});
export default connect(mapStateToProps)(LineChartContainer);