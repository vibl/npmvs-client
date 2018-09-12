import React, {Component} from 'react';
import {connect} from "react-redux";
import styled from 'react-emotion';
import mem from 'mem';
import {withContentRect} from "react-measure";
import isEmpty from "lodash/isEmpty";
import {getPackageColors} from "../../logic/derived-state";
import LineChartFn from './LineChartFn';
import LineChartOverlay from './LineChartOverlay';
import {keys, last, mapObjIndexed, pipe, prop, values} from 'ramda';
const {lacksElementsOf} = require('../../logic/vibl-pure');

const makeOverlayPackageColorsStyles = ({packageColors, focus}) => pipe(
  mapObjIndexed(
    ({color, colorDarker}, packId) =>
      `.overlay.${packId} { 
      color: ${focus === packId ? colorDarker : color}; 
      font-weight: ${focus === packId ? 'bold' : 'normal'}; 
      } `),
  values,
)(packageColors);
const chartStyles = ({packageColors, packages, focus}) => {
  const styleMapper = (packId, i) => {
    const {color, colorDarker} = packageColors[packId];
    return `
      .VictoryContainer > svg > g:nth-child(${(i+1)*2}) > path {
        stroke: ${focus === packId ? colorDarker : color} !important;
        strokeWidth: ${focus === packId ? 3 : 2} !important;
      }
      .VictoryContainer > svg > g:nth-child(${(i+1)*2+1}) > path {
        stroke: ${focus === packId ? colorDarker : color} !important; 
        fill: ${focus === packId ? colorDarker : color} !important;
      }
    `;
  };
  return packages.map(styleMapper);
};
const monthFocusStyles = ({focusedMonth, monthIndex}) => {
  const i = monthIndex[focusedMonth];
  return `
    .VictoryContainer > svg > g > path:nth-child(${i}) {
      
      stroke-width: 6px !important;
    }
  `;
};
const StyleWrapper = styled.div`
  ${makeOverlayPackageColorsStyles}
  ${chartStyles}
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
    const {chartData, focus, packageColors, selection} = this.props;
    if( isEmpty(selection) || isEmpty(chartData) || lacksElementsOf(selection, keys(chartData)) ) return null;
    const [height, width] = this.getDimensions();
    const monthIndex = getMonthIndex(chartData);
    let focusedMonth =  this.state.focusedMonth ;
    if( ! focusedMonth ) {
      const focusedMonth = last(keys(monthIndex));
      this.setState({focusedMonth});
    }
    return (
      // The measureRef has to be the first element and a ReactDom element (so it cannot be styled with Emotion).
      <div ref={this.props.measureRef} style={{flex: 1, width: '100%', position: 'relative'}}>
        <StyleWrapper {...{packageColors, focus, focusedMonth, monthIndex, packages: selection}}>
          <LineChartFn {...{chartData, selection, height, width, setFocusedMonth: this.setFocusedMonth}}/>
          <LineChartOverlay {...{focusedMonth, selection, data: chartData}}/>
        </StyleWrapper>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  focus: state.focus,
  selection: state.selection,
  packageColors: getPackageColors(state.color, state.selection),
});
export default pipe(
  connect(mapStateToProps),
  withContentRect('bounds'),
)(LineChartContainer);