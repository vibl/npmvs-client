import {reverse} from "ramda";
import {css} from 'emotion';
import {toHtmlClass} from '../../util/utils';

export default ({colors, selection, focus}) => {
  if( ! (focus && colors && selection) ) return null;
  const packages = reverse(selection);
  const styleMapper = (packName, i) => {
    const {baseColor, colorDarker, lightGradient} = colors[packName];
    const hasFocus = focus === packName;
    const switchColor = hasFocus ? colorDarker : baseColor;
    const packIdClass = toHtmlClass(packName);
    return css`
      .VictoryContainer > svg {
        overflow: visible;
      }
      // Bars
      .bar-chart.VictoryContainer > svg > g:nth-child(2) > path:nth-child(${i+1}) {
        fill: ${baseColor} !important;
        stroke:  ${switchColor} !important;
      }
      // Bar labels
      .bar-chart.VictoryContainer > svg > g:nth-child(2) > text:nth-child(${i+4}) > tspan {
        fill: ${switchColor} !important;
      }
      // Tick labels
      .bar-chart.VictoryContainer > svg > g:nth-child(1) > g:nth-child(${i+2}) > text > tspan {
        fill: ${switchColor} !important;
      }
      // Lines
      .VictoryContainer.line-chart > svg > g > path.line.${packIdClass} {
        stroke: ${switchColor} !important;
        stroke-width: ${hasFocus ? 3 : 2} !important;
      }
      // Scatter
      .VictoryContainer.line-chart > svg > g > path.scatter.${packIdClass} {
        stroke: ${switchColor} !important; 
        fill: ${switchColor} !important;
      }
      // Overlay
      .VictoryContainer.line-chart + div table tr.overlay.${packIdClass} { 
        color: ${switchColor}; 
        font-weight: ${hasFocus ? '500' : 'normal'}; 
      }
      ///////////////////////////////////////////////////////////////////////////
      // Divcharts
      .divchart {   
      
        .label.row.${packIdClass} {
            color: ${switchColor};
         }  
        .data.row.${packIdClass} {

          .bar {
            background: ${lightGradient};
            box-shadow: 
            ${ hasFocus ?
              `0 0 3px 3px ${colorDarker} 
                    ,inset -1px -1px 1px 0px ${colorDarker};`
              : `0 0 2px 0 ${baseColor}; border: 1px solid ${baseColor};`}
            }
          .value {
            color: ${switchColor};
          }
        }
      }
    `;
  };
  return packages.map(styleMapper);
};