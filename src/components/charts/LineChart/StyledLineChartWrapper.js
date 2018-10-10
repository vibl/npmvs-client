import styled from 'react-emotion';

const StyledLineChartWrapper = styled.div`
    position: relative;
    flex: 1;
    overflow: visible;
   
    .VictoryContainer.line-chart > svg {
      overflow: visible;
  
      & > g > path:nth-child(${p => p.monthIndex}) {
        stroke-width: 6px !important;
      }
    }
}`;
export default StyledLineChartWrapper;
