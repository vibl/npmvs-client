import React from 'react';
import HelpIcon from '@material-ui/icons/Help';
import styled from 'react-emotion';
import RichTip from '../util/RichTip';

const Info = styled(HelpIcon)`
    display: inline;
    color: #ccc;
    height: 0.7rem !important;
`;
const StyledRichTip = styled(RichTip)`
    background: white;
    font-family: "Roboto", sans-serif;
    font-size: 0.8rem;
    color: #333;
    margin: 0;
    max-width: 20rem;
    padding: 0.7rem;
    z-index: 8000;
    
    > div {
      margin: 0.6rem;
    }
    ol {
      margin: 0;
      padding: 0 0 0 0.6rem;
    }
    ol li, p {
      margin: 0.3rem 0;
    }
`;

export default ({infotip}) => (
  <StyledRichTip
    button={Info}
    content={infotip}
  />
);