import React, {Component} from 'react';
import {connect} from "react-redux";
import styled from 'react-emotion';
import {withContentRect} from "react-measure";
import isEmpty from "lodash/isEmpty";
import {getPackageColors} from "../../logic/derived-state";
import LineChartFn from './LineChartFn';
import LineChartOverlay from './LineChartOverlay';
import {keys, mapObjIndexed, pipe, prop, values} from 'ramda';
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
const StyleWrapper = styled.div`
  ${makeOverlayPackageColorsStyles}

`;
class LineChartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedMonth: '',
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
    const shapePackData = packId => {
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
    const data = selection.map(shapePackData);
    const [height, width] = this.getDimensions();
    const {focusedMonth} = this.state;
    return (
      // The measureRef has to be the first element and a ReactDom element (so it cannot be styled with Emotion).
      <div ref={this.props.measureRef} style={{flex: 1, width: '100%', position: 'relative'}}>
        <StyleWrapper {...{packageColors, focus}}>
          <LineChartFn {...this.props} {...{height, width, data, focusedMonth, setFocusedMonth: this.setFocusedMonth}}/>
          <LineChartOverlay {...{focusedMonth, selection, data: chartData}}/>
        </StyleWrapper>
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