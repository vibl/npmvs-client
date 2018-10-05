import React, {Component} from 'react';
import {connect} from "react-redux";
import styled from 'react-emotion';
import {mem} from '../../../util/utils';
import LineChartFn from './LineChartView';
import LineChartOverlay from './LineChartOverlay';
import {keys, last, pipe, values} from 'ramda';
import {setFocus} from "../../../logic/focus";
import {toHtmlClass} from '../../../util/utils';
const {isBlank, notEmpty, lacksElementsOf} = require('../../../util/vibl-fp');

const getPackIdClassNameIndex = (selection) => {
  let acc = {};
  for(const packName of selection) {
    const className = toHtmlClass(packName);
    acc[className] = packName;
  }
  return acc;
};
const StyleWrapper = styled.div`
    position: relative;
    flex: 1;
    ${({monthIndex}) => `
      .VictoryContainer > svg > g > path:nth-child(${monthIndex}) {
        stroke-width: 6px !important;
      }
    `
}`;
const getChartData = mem(
  (selection, data) =>
  selection.map( (packName) => {
    return data[packName] && ({
      packName,
      data: data[packName].map(o => ({...o, packName})),
    })
  })
    .filter(notEmpty)
);
// Indexing month order by month id. Ex: { '2017-09':0, '2017-10':1,...}
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
  handleMouseEnterLine = (event) => {
    let node = event.currentTarget;
    const packIdClassName = node.className.baseVal.split(' ')[1];
    const packName = this.packIdClassNameIndex[packIdClassName];
    this.setState({
      mousePosition: [event.pageX, event.pageY],
    });
    setFocus(packName);
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
    if( isBlank(selection) || isBlank(data) || lacksElementsOf(selection, keys(data)) ) return null;
    const monthIndex = getMonthIndex(data)[focusedMonth];
    this.packIdClassNameIndex = getPackIdClassNameIndex(selection);
    return (
      <StyleWrapper
        {...{monthIndex}}
        onMouseEnter={this.handleMouseEnterChart}
        onMouseLeave={this.handleMouseLeaveChart}
      >
        <LineChartFn
          {...{
            data: getChartData(selection, data),
            selection,
            handleMouseEnterLine: this.handleMouseEnterLine,
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
    );
  }
}
const mapStateToProps = (state) => ({
  focus: state.ui.focus,
  selection: state.selection,
});
export default connect(mapStateToProps)(LineChartContainer);