import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {getPackageColors} from "../../logic/derived-state";
import BarChartFn from './BarChartFn';
import {keys, pipe, reverse} from "ramda";
import isEmpty from "lodash/isEmpty";
import styled from "react-emotion";
const {lacksElementsOf} = require('../../logic/vibl-pure');

// const createPackIndex =
//   (packages) =>
//     packages.reduce(
//       (acc, packId, i) => {
//         acc[packId] = i;
//         return acc;
//       },
//       {}
//     );

const colorStyles = ({packageColors, selection, focus}) => {
  const packages = reverse(selection);
  const styleMapper = (packId, i) => {
    const {color, colorDarker} = packageColors[packId];
    return `
      .VictoryContainer > svg > g:nth-child(2) > path:nth-child(${i+1}) {
        fill: ${color} !important;
        stroke:  ${focus === packId ? colorDarker : color} !important;
      }
      .VictoryContainer > svg > g:nth-child(1) > g:nth-child(${i+2}) > text > tspan {
        fill: ${focus === packId ? colorDarker : color} !important;
      }
      .VictoryContainer > svg > g:nth-child(2) > text:nth-child(${i+4}) > tspan {
        fill: ${focus === packId ? colorDarker : color} !important;
      }
    `;
  };
  return packages.map(styleMapper);
};
const StyleWrapper = styled.div`
  svg {
    overflow: visible;
  }
  ${colorStyles}
`;
class BarChartContainer extends PureComponent {
  render() {
    const {chartData, fieldId, focus, packageColors, selection} = this.props;
    if( isEmpty(selection) || isEmpty(chartData) || lacksElementsOf(selection, keys(chartData)) ) return null;
    return (
      <StyleWrapper {...{packageColors, focus, selection}}>
       <BarChartFn {...{chartData, selection, fieldId}}/>
      </StyleWrapper>
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
)(BarChartContainer);

