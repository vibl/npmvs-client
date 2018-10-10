import {css} from 'emotion';
import {mem, simpleColorGradient} from "../../util/utils";

const focusStyles = (colors, n) => {
  const color = colors[n];
  const colorDarker = color.darken(0.5).hsl().string();
  const nth = n + 1;
  return css`     
    #selection .package:nth-of-type(${nth}) {        
      box-shadow: 0 0 3px 3px ${colorDarker}, inset -1px -1px 1px 0px ${colorDarker} !important;    
    }
    .VictoryContainer.line-chart > svg {
      & > g:nth-of-type(${nth*2}) > path.line {  
         stroke: ${colorDarker} !important;
         stroke-width: 3px !important;
      }
      & > g:nth-of-type(${nth*2+1}) > path.scatter {
        stroke: ${colorDarker} !important; 
        fill: ${colorDarker} !important;
      }
    }
     #line-chart-overlay > table > tbody > tr.overlay:nth-of-type(${nth}) { 
       color: ${colorDarker} !important; 
       font-weight: 500 !important; 
    }
    .divchart {         
      .label.row:nth-of-type(${nth}) {
        color: ${colorDarker} !important; 
      }  
      .data.row:nth-of-type(${nth}) {
        .bar {
          box-shadow: 0 0 3px 3px ${colorDarker},inset -1px -1px 1px 0px ${colorDarker} !important;
        }
        .value {
          color: ${colorDarker} !important; 
        }
      }
    }
  `;
};
export default mem(focusStyles);