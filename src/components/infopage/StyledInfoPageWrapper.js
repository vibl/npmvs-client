import Card from "@material-ui/core/Card/index";
import styled from "react-emotion";
import theme from "../styles/theme";

const mainColor = theme.palette.primary.main;

const StyledInfoPageWrapper = styled(Card)`
    position: absolute;
    top: 3rem;
    left: 0.3rem;
    width: calc(100% - 0.6rem);
    pre {
      white-space: pre-wrap;
    }
    h1, h2, h3, h4 {
      color: ${mainColor};
    }
    .column {
       width: 50%;
       max-width: 50%;
       min-width: 50%;
     
       margin: 1rem;
    
    }
    td.label {
      color: ${mainColor};
    }

    table.main {
      width: 100%;   
    
      & > tbody > tr > td {
        padding: .5rem 0.4rem;
        width: 8rem;
        
        &.label {
          text-align: right;
          padding-right: 0.5rem;
        }
      }  
    } 
    .columm.value table {
       width: 100%;   

       td {
        font-size: 0.8em;
        width: 50%;
        
        &.value {
          color: ${mainColor};
        }
      } 
    }
    tr {
      transition: background 0.3s;
      
      &:hover {
         background: #fee;
      }
}
`;
export default StyledInfoPageWrapper;