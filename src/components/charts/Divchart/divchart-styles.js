import {css} from 'emotion';

export default () => css`
  display: flex;
  flex-direction: row;
  align-items: start;
 
  .label.column {
    display: flex;
    flex-direction: column-reverse;
    align-items: stretch;
  }
  .data.column {
    flex: 1;
    display: flex;
    flex-direction: column-reverse;
    align-items: stretch;
  }
  .label.row  {
     margin-right: 0.35rem;
     flex: 1;
     text-align: right;
  }
  .data.row {
    display: flex;
    flex: 2;
    margin-right: 2.9rem;
    align-items: center;
  }
  .label.row, .value {
     font-size: 0.9rem;
  }
  .data.row, .label.row {
     height: 1rem;
     margin-top: 0.3rem;
     margin-bottom: 0.3rem;
  }
  .bar {
    border: 0; 
    vertical-align: middle;
    height: 100%;
  }
  .bar[value='0'],
  .placeholder[value='100'] {
    display: none;
  }
  .value {
    margin-left: 0.4rem;
    vertical-align: middle;
    text-align: left;
  }  
`;
