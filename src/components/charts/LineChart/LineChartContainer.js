import React, {Component} from 'react';
import {connect} from "react-redux";
import styled from 'react-emotion';
import mem from 'mem';
import {withContentRect} from "react-measure";
import isEmpty from "lodash/isEmpty";
import {getPackageColors} from "../../../logic/derived-state";
import LineChartFn from './LineChartView';
import LineChartOverlay from './LineChartOverlay';
import {keys, last, pipe, values} from 'ramda';
import {setFocus} from "../../../logic/focus";
const {lacksElementsOf} = require('../../../logic/vibl-fp');

const monthFocusStyles = ({focusedMonth, monthIndex}) => {
  const i = monthIndex[focusedMonth];
  return `
    .VictoryContainer > svg > g > path:nth-child(${i}) {
      
      stroke-width: 6px !important;
    }
  `;
};
const StyleWrapper = styled.div`
  ${monthFocusStyles}
`;
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
  getDimensions() {
    // Resize chart with parent container
    const [marginHeight, marginWidth] = [40, 0];
    let {height: parentHeight, width: parentWidth} = this.props.contentRect.bounds;
    // console.log('parentHeight, parentWidth:', parentHeight, parentWidth);
    return /*[200, 200] ||*/ [
      parentHeight - marginHeight,
      parentWidth - marginWidth,
    ]
  }
  render () {
    const {data, focus, selection} = this.props;
    if( isEmpty(selection) || isEmpty(data) || lacksElementsOf(selection, keys(data)) ) return null;
    const [height, width] = this.getDimensions();
    const monthIndex = getMonthIndex(data);
    let focusedMonth =  this.state.focusedMonth ;
    if( ! focusedMonth ) {
      const focusedMonth = last(keys(monthIndex));
      this.setState({focusedMonth});
    }
    const chartData = selection.map(packId => ({
      packId,
      data: data[packId].map(o => ({...o, packId})),
    }));
    return (
      // The measureRef has to be the first element and a ReactDom element (so it cannot be styled with Emotion).
      <div ref={this.props.measureRef} style={{width: '100%', height: 'calc(100% - 20px)', position: 'relative'}}>
        <StyleWrapper {...{focus, focusedMonth, monthIndex, packages: selection}}>
          <LineChartFn {...{data: chartData, selection, height, width, handleMouseEnter: this.handleMouseEnter,
            setFocusedMonth: this.setFocusedMonth}}/>
          <LineChartOverlay {...{focusedMonth, selection, data: data}}/>
        </StyleWrapper>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  focus: state.focus,
  selection: state.selection,
});
export default pipe(
  connect(mapStateToProps),
  withContentRect('bounds'),
)(LineChartContainer);