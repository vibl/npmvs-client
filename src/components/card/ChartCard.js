import Card from '@material-ui/core/Card';
import styled from 'react-emotion';
import theme from "../styles/theme";

export default  styled(Card)`
    padding: 10px 15px 5px 15px;
    align-items: center;
    margin: 0 .3rem .6rem;
    h2 {
      color: ${theme.palette.primary.main}; 
      font-size: 0.9em;
      font-weight: 500;
      text-align: center;
      margin: 0 0 .6rem 0;
    }
`;
