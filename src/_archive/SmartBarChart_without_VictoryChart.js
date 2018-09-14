import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import {VictoryAxis, VictoryBar, VictoryLabel} from 'victory';
import isEmpty from 'lodash/isEmpty';
import {keys, map, max, pick, pipe, props, reduce, reverse, values, zipObj} from 'ramda';
import {getPackageColors, getUnfocusedColor} from "../logic/derived-state";
import fields from '../data/data-fields';
import {pipeFn} from '../logic/field-fns';
import state from "../logic/store";

const {ident, ifDefinedElse, listMax} = require('../logic/vibl-fp');

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
  padding: 15,
};
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding: 20,
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
        display: 'none',
      },
      independentAxis: {
        axisLabel: {
          display: 'none',
        }
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
        padding: 8,
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

class SmartBarChart extends PureComponent {

  render() {
    let {data} = this.props;
    const {fieldId, focus, packageColors, selection, unfocusedColor} = this.props;
    // console.log('Rendering BarChart:', {data, selection});
    const packages = reverse(selection);
    const displayFn = pipeFn(fields[fieldId].displayFn);
    const barData = packages.map(packId => {
      const isFocused = packId === focus;
      const fillColor = !focus || isFocused ? packageColors[packId].value : unfocusedColor;
      const value = data[packId];
      return {
        x: packId,
        y: value,
        fill: fillColor,
        label: displayFn(value),
      }
    });
    const height = packages.length * 40;
    const width = 350;
    // const labelData = packages.map( packId => ({
    //   ...barData[packId],
    //   label: data[packId] * 100,
    //   style: {fontSize: 10},
    //   yOffset: 5,
    // }));
    return isEmpty(selection) || isEmpty(data) ? null : (
      <svg
        width={width}
      >
        <VictoryAxis
          height={height}
          width={width}
          dependentAxis
          tickLabelComponent={<VictoryLabel/>}
          standalone={false}
        />
        <VictoryBar
          data={barData}
          x="x"
          y="y"
          labels={d => d.label}
          horizontal={true}
          style={{
            data: {
              fill: d => d.fill,
            },
          }}
          barRatio={1.3}
          padding={{ top: 20, bottom: 30 }}
          height={height}
          width={width}
          standalone={false}
          // barWidth={15}
        />
      </svg>

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

