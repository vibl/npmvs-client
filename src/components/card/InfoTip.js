import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import styled from 'react-emotion';
import RichTip from '../generic/RichTip';

const Info = styled(InfoIcon)`
    display: inline;
    color: #ccc;
    height: 0.7rem !important;
`;
const StyledRichTip = styled(RichTip)`
    background: white;
    font-family: "Roboto", sans-serif;
    font-size: 0.7rem;
    color: #333;
    margin: 0;
    max-width: 20rem;
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

export default ({description}) => (
  <StyledRichTip
    button={Info}
    content={description}
  />
);