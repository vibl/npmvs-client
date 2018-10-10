import React, {Fragment} from 'react';
import Markdown from 'react-markdown';
import Card from '@material-ui/core/Card';
import HelpIcon from '@material-ui/icons/Help';
import styled from 'react-emotion';

const markdownOptions = {
  escapeHtml: false,
  renderers: {
    centerAligned: (props) => <div style={{textAlign: 'center'}}>{props.children}</div>,
    italic: (props) => {console.log('em props:', props)}
  },
  plugins: [
    require('remark-align'),
  ]
};
const StyledWrapper = styled.span`

    .icon {
      display: inline;
      color: #ccc;
      height: 0.7rem !important;
    }
    &:hover .infotip {
      display: block;
      opacity: 1;
      transition: opacity 0.5s linear;
    }
    .infotip {
      background: white;
      border-radius: 0.25rem;
      color: #802;
      display: none;
      font-family: "Roboto", sans-serif;
      font-size: 0.8rem;
      font-weight: normal;
      left: 0;
      margin: 0.2rem auto;
      opacity: 0;
      padding: 0.2rem 0.8rem 0.4rem;
      position: absolute;
      right: 0;
      text-align: left;
      transition: display 0s 1s, opacity 0.3s linear;
      vertical-align: middle;
      width: 21rem;
      z-index: 9000;
      
      > div {
       margin: 0.6rem;
      }
      ol {
       margin: 0;
       padding: 0 0 0 0.6rem;
      }
      ol li, p {
       margin: 0.5rem 0;
      }
    }
`;

const InfoTip = ({infotip}) => {
  return (
    <StyledWrapper className="infotip-target">
      <HelpIcon className='icon' />
      <Card className="infotip">
        <Markdown source={infotip}{...markdownOptions}/>
      </Card>
    </StyledWrapper>
  );
}

export default InfoTip;