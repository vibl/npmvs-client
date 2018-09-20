import React from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import styled from 'react-emotion';
import {css} from 'emotion';
import {cn, toHtmlClass} from '../../logic/utils';
import InfoPage from "./InfoPage";
import MeasureColumnHeight from "../generic/MeasureColumnHeight";
const {isEmpty, toArray} = require('../../logic/vibl-fp');

const displayedInfoPage = (p) => {
   return isEmpty(p.displayPackId)
     ? null
     :css`
      .infopage.${toHtmlClass(p.displayPackId)} {
        display: block !important;
      }`;
};

const InfoPagesWrapper = styled.div`
  .infopage {
    display: none;
    z-index: 3000;
    
    td.label {
      text-align: right;
      color: #802;
      padding-right: 0.5rem;
    }
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
  infoPages: state.data.InfoPages,
  displayPackId: state.ui.displayPackId,
});
export default connect(mapStateToProps)(pure(InfoPages));