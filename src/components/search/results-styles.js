import styled from 'react-emotion';

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
export const StyledContainer = styled.div`
    background-color: white;
    width: 100%;
    position: absolute;
    left: 0;
    top: 2.2rem;
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
        &:hover {
          background: wheat;
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
          padding: 0 1rem 0 0.4rem;
          white-space: nowrap;
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

          & > .ais-Highlight {
            display: flex;
            max-height: 3rem;
            min-width: 10rem;
            flex-wrap: wrap;
            align-items: center;

            & > span {
              border: 1px solid #c16f83 !important;
              border-radius: 0.3rem;
              padding: 0.08rem 0.18rem;
              cursor: default;
              background: linear-gradient(white, #ffe6ba);
              display: block;
              margin: 0 0.06rem 0.3rem;              
              
              &:hover {
                background: #802 !important;
                color: white !important;
              }
            }
        }
        }

        .tooltip-target {
          position: relative;
          display: inline-block;
        }
        td:hover > .tooltip-target > .tooltip {
          opacity: 1;
        }
        .tooltip {
          background-color: white;
          border-radius: 0.25rem;
          color: #802;
          font-size: 0.8rem;
          left: calc(100% + 0.5rem);
          opacity: 0;
          padding: 0.4rem;
          position: absolute;
          text-align: center;
          top: -0.35rem;
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