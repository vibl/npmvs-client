import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import {Bar, VictoryAxis, VictoryBar, VictoryChart, VictoryContainer, VictoryLabel} from 'victory';
import styled from 'react-emotion';
import isEmpty from 'lodash/isEmpty';
import {keys, map, pick, pipe, props, reduce, reverse, values, zipObj} from 'ramda';
import {getPackageColors, getUnfocusedColor} from "../../logic/derived-state";
import fields from '../../logic/data-fields';
import fns from '../../logic/mapper/field-fns';
import state from "../../logic/store";
const {anyValue, hsl, ident, ifDefinedElse, isNegative, listMax, listMin} = require('../../logic/vibl-pure');

let mouseOutTimeout;
const handleMouseOver = (packId) => {
  clearTimeout(mouseOutTimeout);
  state.set({focus: packId});
};
const handleMouseOut = () => {
  mouseOutTimeout = setTimeout(() => state.set({focus: undefined}), 200);
};


// Typography
const sansSerif =
  "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif";
const letterSpacing = "normal";
const fontSize = 14;

const baseProps = {
  overflow: 'visible',
  padding: 20,
};
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding: 8,
  stroke: "transparent",
};
const theme = {
  axis: {
    ...baseProps,
    style: {
      axis: {
        stroke: "none",
      },
      axisLabel: {
        ...baseLabelStyles,
      },
      dependentAxis: {
        axisLabel: {
          ...baseLabelStyles,
        },
      },
      grid: {
        fill: "none",
        stroke: "none",
        pointerEvents: "painted"
      },
      ticks: {
        fill: "transparent",
        size: 1,
        stroke: "transparent"
      },
    }
  },
  bar: {
    ...baseProps,
    style: {
      data: {
        strokeWidth: 0
      },
      labels: baseLabelStyles
    }
  },
  chart: baseProps,
  errorbar: {
    ...baseProps,
    borderWidth: 8,
    style: {
      data: {
        fill: "transparent",
        strokeWidth: 2
      },
    },
  },
  line: {
    ...baseProps,
    style: {
      data: {
        fill: "transparent",
        strokeWidth: 2
      },
    }
  },
  tooltip: {
    style: {
      padding: 5,
      pointerEvents: "none"
    },
    flyoutStyle: {
      strokeWidth: 1,
      fill: "#f0f0f0",
      pointerEvents: "none"
    },
    cornerRadius: 5,
    pointerLength: 10
  },
};
const VictoryContainer$ = styled(VictoryContainer)`
  svg {
    overflow: visible;
  }
`;

class SmartBarChart extends PureComponent {

  render() {
    let {data} = this.props;
    const {fieldId, focus, packageColors, selection} = this.props;
    // console.log('Rendering BarChart:', {data, selection});
    const packages = reverse(selection);
    const displayFn = fns(fields[fieldId].displayFn);
    const barData = packages.map(packId => {
      const isFocused = packId === focus;
      const {hue, saturation, lightness, value: color} = packageColors[packId];
      const stroke = isFocused ? hsl(hue, saturation, lightness * 0.6) : 'none';
      const value = data[packId];
      return {
        packId,
        value,
        label: displayFn(value),
        color,
        stroke,
      }
    });
    const height = packages.length * 40;
    const width = 300;
    const moveTickLabel = anyValue(isNegative, data)
      ? {
        tickLabelComponent: <VictoryLabel x={30}/>,
        padding: {left:80, right:0, top:20, bottom:20}
      }
      : {};
    // const labelData = packages.map( packId => ({
    //   ...barData[packId],
    //   label: data[packId] * 100,
    //   style: {fontSize: 10},
    //   yOffset: 5,
    // }));
    return isEmpty(selection) || isEmpty(data) ? null : (
      <VictoryChart
        theme={theme}
        height={height}
        width={width}
        style={{
          parent: {  }}}
        padding={{left:40, right:0, top:20, bottom:20}}
        containerComponent={<VictoryContainer$ responsive={false}/>}
        {...moveTickLabel}
      >
        <VictoryAxis
          data={barData}
          dependentAxis
          style={{
            tickLabels: {
              fill: n => {
                const {color, stroke } = barData[n - 1];
                return stroke === 'none' ? color : stroke;
              },
              padding: 8,
            }
          }}
          // tickLabelComponent={<VictoryLabel data={barData} style={{fill: d => d.color}}/>}
          {...moveTickLabel}
        />
        <VictoryBar
          data={barData}
          x="packId"
          y="value"
          labels={d => d.label}
          horizontal={true}
          style={{
            data: {
              fill: d=>d.color,
              stroke: d=>d.stroke,
              strokeWidth: 2
            },
            labels: {
              fill: d => d.stroke === 'none' ? d.color : d.stroke,
              
            },
          }}
          barRatio={1.3}
          // barWidth={15}
          height={height}
          width={width}
          events={[
            {
              target: "data",
              eventHandlers: {
                onMouseEnter: () => {
                  return [{
                    target: "labels",
                    mutation: ({datum}) => {state.set({focus: datum.packId})},
                  }];
                }
              }
            }
          ]}
          // dataComponent={
          //   <Bar
          //     events={{
          //       onClick: (evt) => {
          //         debugger;
          //         return evt;
          //       }
          //       ,
          //     }}
          //   />}
        />
      </VictoryChart>

    )
  };
}

const mapStateToProps = (state) => ({
  focus: state.focus,
  selection: state.selection,
  unfocusedColor: getUnfocusedColor(state.color.lightness),
  packageColors: getPackageColors(state.color, state.selection),
});
export default pipe(
  pure,
  connect(mapStateToProps),
)(SmartBarChart);

