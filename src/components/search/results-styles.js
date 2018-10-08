import styled from 'react-emotion';
import Card from "@material-ui/core/Card";
import {linearGradient} from "../../util/utils";

export const NoResults = styled.div`
    background: white;
    color: #802;
    font-size: 0.9rem;
    padding: 0.3rem;
    
    p {
      margin: 0;
      padding: 0;
    }
`;
export const StyledContainer = styled(Card)`
    background-color: white;   
    border: 1px solid #c59e53;
    height: calc(100% - 3rem - 0.3rem);
    left: 0.3rem;
    overflow-y: scroll;
    position: fixed;
    top: 3.6rem;
    width: calc(100% - 0.6rem);
    z-index: 1000;

    table.results {
      border-collapse: collapse;
      width: 100%;
      
      tr.hit {
        color: #880022;
        font-size: 0.9rem;
        height: 3rem;
        background: white;
        transition: background 0.3s;

        &:nth-child(odd) {
          background-color: hsl(45, 100%, 95%);
        }
        &:hover, &.hover {
          background: wheat;
          
          & > td.name > .button {
             visibility: visible !important;
          }
        }
        td {
          padding: 0;
          vertical-align: middle;
        }
        td.avatar {
          padding-left: 0.6rem;

          .img-wrapper {
            width: 1.6rem;

            img {
              display: inline-block;
              vertical-align: middle;
              width: 100%;
            }
          }
        }
        td.name {
          font-size: 1rem;
          padding: 0 2rem 0 0.4rem;
          white-space: nowrap;
          
          > .button {
            background: ${linearGradient('#AAA', 0.1, -0.3)};
            border-radius: 0.25rem;
            border: 1px solid #AAA;
            box-shadow: 0 0 2px 0 #AAA;
            color: #444;
            cursor: default;
            font-size: 1rem;
            line-height: 2.1rem;
            margin-top: -1.6rem;
            padding: 0 0.3rem;
            position: absolute;
            text-align: center;
            text-shadow: hsl(0, 100%, 100%, 0.4) 0 0.08rem 0, hsl(0, 100%, 0%, 1) 0px -0.08rem 0px;
            vertical-align: middle;
            visibility: hidden;
            
            &:hover {
              box-shadow: 0 0 3px 3px #444, inset -1px -1px 1px 0px #444;
            } 
            
            a.url {
              color: #802;
              font-size: 0.9rem;
              text-decoration: none;
              text-shadow: none;
              padding: 0 0.4rem;
            }
          }

        }
        td.downloads.number {
          padding: 0 1rem;
          text-align: right;
        }
        td.downloads.bar-container {
          .bar {
            background-color: #880022;
            box-shadow: 0 0 2px #880022;
            display: inline-block;
            height: 1rem;
            vertical-align: middle;
          }
        }
        td.description {
          min-width: 20rem;
          padding: 0 1rem;
          white-space: pre-wrap;
        }
        td.keywords {

          & > span.ais-Highlight {
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            max-height: 3.3rem;
            min-width: 10rem;
            overflow-y: hidden;

            & > span {
              border: 1px solid #c16f83 !important;
              border-radius: 0.3rem;
              padding: 0.08rem 0.18rem;
              cursor: default;
              background: linear-gradient(white, #ffe6ba);
              display: block;
              margin: 0.3rem 0.06rem 0;            
              
              &:hover {
                background: #802 !important;
                color: white !important;
              }
            }
        }
        }

        .tooltip-target {
          position: relative;
        }
        *:hover > .tooltip-target .tooltip, 
        .tooltip-target:hover .tooltip {
          display: block;
          opacity: 1;
          transition: opacity 0.5s linear;
        }
        .tooltip {
          background-color: white;
          border-radius: 0.25rem;
          color: #802;
          display: none;
          font-size: 0.8rem;
          left: calc(100% + 0.5rem);
          opacity: 0;
          padding: 0.4rem;
          position: absolute;
          text-align: center;
          top: -0.35rem;
          transition: display 0s 1s, opacity 0.5s linear;
          vertical-align: middle;
          white-space: nowrap;
          z-index: 5000;
        }
        .tooltip::after {
          content: " ";
          position: absolute;
          top: 50%;
          right: 100%;
          margin-top: -0.3rem;
          /* border-width: 0.3rem; */
          /* border-style: solid; */
          border: solid 0.3rem;
          border-color: transparent white transparent transparent;
        }
        mark {
          background-color: hsl(45, 100%, 76%);
          color: #701;
        }
      }
    }
`;