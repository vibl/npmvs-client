import React from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import styled from 'react-emotion';
import {css} from 'emotion';
import {cn, toHtmlClass} from '../../logic/utils';
import InfoPage from "./InfoPage";

const displayedInfoPage = (p) => {
   return   ! p.displayPackId
     ? null
     :css`
      .infopage.${toHtmlClass(p.displayPackId)} {
        display: block;
      }`;
};

const InfoPagesWrapper = styled.div`
  .infopage {
    display: none;
  }
  ${displayedInfoPage}
`;
const InfoPages = ({selection, displayPackId}) => {
  return ! selection ? null : (
     <InfoPagesWrapper {...{displayPackId}}>
       { selection.map( packId => (
         <InfoPage
           key={packId}
           {...{packId}}
         />
       ))}
     </InfoPagesWrapper>
  )
};
const mapStateToProps = (state) => ({
  selection: state.selection,
  displayPackId: state.ui.displayPackId,
});
export default connect(mapStateToProps)(pure(InfoPages));