import React from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import styled from 'react-emotion';
import {cn, toHtmlClass} from "../../logic/utils";

const InfoPageWrapper = styled.div`
    position: fixed;
    top: 4rem;
    left: 1rem;
    background: white;
`;
const InfoPage = (props) => {
  const {packId, name, version} = props;
  return (
    <InfoPageWrapper
      className={cn('infopage', packId)}
    >
      {name}: {version}
    </InfoPageWrapper>
  )
};
const fields = ['name', "version"];
const mapStateToProps = (state, props) => {
  let acc = {};
  if( ! state.data ) return acc;
  let field;
  for(field of fields) {
    acc[field] = state.data[field] ? state.data[field][props.packId] : null;
  }
  return acc;
};
export default connect(mapStateToProps)(pure(InfoPage));
