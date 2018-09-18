
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
export default {
  axis: {
    ...baseProps,
    style: {
      axis: {
        stroke: "#BBB",
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
        size: 5,
        stroke: '#BBB',
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
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