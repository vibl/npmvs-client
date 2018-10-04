import React from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import styled from 'react-emotion';
import {css} from 'emotion';
import {toHtmlClass} from '../../util/utils';
import InfoPage from "./InfoPage";
const {toArray} = require('../../util/vibl-fp');

const displayedInfoPage = (p) => {
   return ! p.displayPackId ? null :
     css`
      display: block;

      .infopage.${toHtmlClass(p.displayPackId)} {
          //opacity: 100;
        visibility: visible !important;
      }`;
};

const InfoPagesWrapper = styled.div`
  display: none; // Necessary for the scrollbar not to appear.

  .infopage {
    visibility: hidden; // Faster than display:none (when switching tabs)
    //opacity: 0;
   }
  ${displayedInfoPage}
`;
const InfoPages = ({infoPages, displayPackId}) => {
  return ! infoPages ? null : (
     <InfoPagesWrapper {...{displayPackId}}>
       { toArray(infoPages, (data, packId) => (
         <InfoPage
           key={packId}
           {...{packId, data}}
         />
       ))}
     </InfoPagesWrapper>
  )
};
const mapStateToProps = (state) => ({
  infoPages: state.components && state.components.InfoPages,
  displayPackId: state.ui.displayPackId,
});
export default connect(mapStateToProps)(pure(InfoPages));