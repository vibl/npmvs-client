import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {withContentRect} from "react-measure";
import isEmpty from "lodash/isEmpty";
import {getPackageColors} from "../../logic/derived-state";
import LineChartFn from './LineChartFn';
import LineChartOverlay from './LineChartOverlay';
import {keys, pipe} from 'ramda';
const {lacksElementsOf} = require('../../logic/vibl-pure');

const getLastMonth = () => {
  const today = new Date();
  const lastMonth = today.getMonth() - 1;
  const lastMonthYear = today.getFullYear() - 1;
  const lastMonthStr = lastMonth.toString().padStart(2,"0");
  return `${lastMonthYear}-${lastMonthStr}`;
};

class LineChartContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focusedMonth: getLastMonth(),
    }
  }
  setFocusedMonth = (month) => {
    this.setState( state => ({...state, focusedMonth: month}));
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
    const processData = packId => {
      const isFocused = packId === focus;
      const {color, colorDarker} = packageColors[packId];
      const data = chartData[packId].map(o => ({...o, isFocused, packId}));
      return {
        packId,
        data,
        color,
        colorDarker,
      }
    };
    const data = selection.map(processData);
    const [height, width] = this.getDimensions(); // Debugging
    return (
      // The measureRef has to be the first element and a ReactDom element (so it cannot be styled with Emotion).
      <div ref={this.props.measureRef} style={{flex: 1, width: '100%', position: 'relative'}}>
        <LineChartFn {...this.props} {...{height, width, data, setFocusedMonth: this.setFocusedMonth}}/>
        <LineChartOverlay month={this.state.focusedMonth}/>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  selection: state.selection,
  packageColors: getPackageColors(state.color, state.selection),
});
export default pipe(
  connect(mapStateToProps),
  withContentRect('bounds'),
)(LineChartContainer);