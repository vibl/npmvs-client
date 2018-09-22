import Card from '@material-ui/core/Card';
import styled from 'react-emotion';
import theme from "../styles/theme";

export default  styled(Card)`
    align-items: center;
    margin: 0 .3rem .6rem;
    padding: .8rem .8rem 1rem 1rem;
    h2 {
      color: ${theme.palette.primary.main}; 
      font-size: 0.9rem;
      font-weight: 500;
      text-align: center;
      margin: 0 0 .6rem 0;
    }
`;
