import Card from "@material-ui/core/Card/index";
import styled from "react-emotion";
import theme from "../styles/theme";

const mainColor = theme.palette.primary.main;

const StyledInfoPageWrapper = styled(Card)`
    position: absolute;
    top: -0.5rem;
    left: 0.3rem;
    width: calc(100% - 0.6rem);
    font-size: 0.9rem;

    a {
      color: ${mainColor};
    }
    h1, h2, h3, h4, h5 {
      color: ${mainColor};
      font-weight: 500;
    }
    h1 {
      font-size: 1.6rem;
      font-weight: 700;
    } 
    h2 {
      font-size: 1.4rem;
      margin: 1.4em 0 0 0
    }
    h3 {
      font-size: 1.2rem;
      margin: 1.2em 0 0 0
    }
    h4 {
      font-size: 1rem;
      margin: 1em 0 0 0
    }
    h5 {
      font-size: 0.9rem;
      margin: 0.9em 0 0 0
    }
    .column {     
       padding: 1rem;
    
    }
    ul {
      padding-left: .9em;
      
      li {
        list-style: none; 
      }
      li::before {
        color: ${mainColor};  
        content: "\\2022"; 
        font-size: 2em;
        padding-right: .3em;
        position: relative;
        top: .21em;
      }
    }
    p, ul, pre {
      margin: .6rem .8rem;
    }
    table.main {
      width: 100%;   
      border-collapse: collapse;
      
      & > tbody > tr {
        transition: background 0.3s;
        
        &:hover {
           background: #fef4f4;
        }
        &:last-child td {
          border-bottom: none;
        }
        & > td {
          padding: .5rem 0.4rem;
          width: 8rem;
          border-bottom: 1px solid #f4e3e7;
          
          &.label {
            text-align: right;
            padding-right: 0.5rem;
            color: ${mainColor};
            font-weight: 500;
          }
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
    img {
      max-width: 100%;
    }
}
}
`;
export default StyledInfoPageWrapper;