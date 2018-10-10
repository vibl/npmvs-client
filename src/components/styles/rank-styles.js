import {css} from 'emotion';
import {simpleColorGradient, mem} from "../../util/utils";

// TODO: added text color : "  color: ${ ({lightness}) => lightness > 50 ? 'black' : 'white' };"

const styleMapper = (color, n) => {
  const baseColor = color.hsl().string();
  const colorDarker = color.darken(0.5).hsl().string();
  const nth = n + 1;
  return css`     
    #selection .package:nth-of-type(${nth}) {
      background: ${simpleColorGradient(baseColor, 0.1, -0.3)};
      box-shadow: 0 0 2px 0 ${baseColor};
      border: 1px solid ${baseColor};
      color: ${colorDarker};
    }
    .VictoryContainer.line-chart > svg {
      overflow: visible;
      & > g:nth-of-type(${nth*2}) > path.line {
        stroke: ${baseColor};
        stroke-width: 2px;
      }
      & > g:nth-of-type(${nth*2+1}) > path.scatter {
        stroke: ${baseColor}; 
        fill: ${baseColor};
      }
    }
    #line-chart-overlay > table > tbody > tr.overlay:nth-of-type(${nth}) { 
      color: ${baseColor}; 
    }
    .divchart {         
      .label.row:nth-of-type(${nth}) {
        color: ${baseColor}; 
       }  
      .data.row:nth-of-type(${nth}) {
        .bar {
          background: ${simpleColorGradient(baseColor, 0.2, -0.2)};
          box-shadow:  0 0 2px 0 ${baseColor}; border: 1px solid ${baseColor};
        }
        .value {
          color: ${baseColor}; 
        }
      }
    }
  `;
};
const rankStyles = (colors) => colors.map(styleMapper);

export default mem(rankStyles);